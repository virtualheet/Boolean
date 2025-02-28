'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

interface Project {
  id: string;
  title: string;
  description: string;
  pricing: number;
  category: string;
  skills: string;
  duration: string;
  createdAt: string;
}

interface UserCredits {
  cradits: number;
}

export default function ProjectView() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [project, setProject] = useState<Project | null>(null);
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const response = await fetch('/api/users/me');
        const data = await response.json();
        if (response.ok) {
          setUserCredits(data);
        }
      } catch (error) {
        console.error('Error fetching user credits:', error);
      }
    };

    if (user) {
      fetchUserCredits();
    }
  }, [user]);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/all/${params.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setProject(data.project);
        } else {
          setError(data.error || 'Failed to fetch project details');
        }
      } catch (error) {
        setError('Error fetching project details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProjectDetails();
    }
  }, [params.id]);

  const handleApply = () => {
    if (!userCredits || userCredits.cradits < 1) {
      setSubmitError('You need at least 1 credit to submit a proposal. Please add more credits to continue.');
      return;
    }
    setShowProposalForm(true);
    setSubmitError(null);
  };

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCredits || userCredits.cradits < 1) {
      setSubmitError('Insufficient credits. Please add more credits to submit proposals.');
      return;
    }
    
    setApplying(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/proposals/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project?.id,
          coverLetter,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Proposal submitted successfully! 1 credit has been deducted.');
        router.push('/dashboard');
      } else {
        setSubmitError(data.error || 'Failed to submit proposal');
        if (data.error === 'Insufficient credits') {
          setUserCredits(prev => prev ? { ...prev, cradits: 0 } : null);
        }
      }
    } catch (error) {
      setSubmitError('Error submitting proposal');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-red-500 text-center">
            {error || 'Project not found'}
          </div>
          <div className="mt-4 text-center">
            <Link href="/projects" className="text-blue-600 hover:text-blue-800">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categories = JSON.parse(project.category);
  const skills = JSON.parse(project.skills);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/projects" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
            ← Back to Projects
          </Link>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Available Credits: <span className="font-bold text-green-600 dark:text-green-400">{userCredits?.cradits || 0}</span>
          </div>
        </div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold dark:text-white">{project.title}</h1>
          {!showProposalForm && (
            <button
              onClick={handleApply}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!userCredits || userCredits.cradits < 1}
            >
              {!userCredits || userCredits.cradits < 1 ? 'Need More Credits' : 'Apply Now'}
            </button>
          )}
        </div>

        {showProposalForm && (
          <div className="mb-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 dark:text-white">Submit Your Proposal</h2>
            <form onSubmit={handleSubmitProposal}>
              <div className="mb-4">
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                  placeholder="Explain why you're the best fit for this project..."
                  required
                />
              </div>
              {submitError && (
                <div className="mb-4 text-red-500">
                  {submitError}
                </div>
              )}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowProposalForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={applying}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Submit Proposal'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Budget</h2>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${project.pricing}
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Duration</h2>
              <p className="text-gray-700 dark:text-gray-300">{project.duration}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Posted</h2>
              <p className="text-gray-700 dark:text-gray-300">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Project Description</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 