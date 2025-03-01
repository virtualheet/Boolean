'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  userId: string;
}

interface Proposal {
  id: string;
  userId: string;
  coverLetter: string;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
  };
}

export default function ProjectDetails() {
  const params = useParams();
  const { user } = useUser();
  const [project, setProject] = useState<Project | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setProject(data.project);
          setIsOwner(data.project.userId === user?.id);
          
          // If user is the project owner, fetch proposals
          if (data.project.userId === user?.id) {
            const proposalsResponse = await fetch(`/api/proposals/${params.id}`);
            const proposalsData = await proposalsResponse.json();
            if (proposalsResponse.ok) {
              setProposals(proposalsData.proposals);
            }
          }
        } else {
          setError(data.error || 'Failed to fetch project details');
        }
      } catch (error) {
        setError('Error fetching project details');
      } finally {
        setLoading(false);
      }
    };

    if (params.id && user) {
      fetchProjectDetails();
    }
  }, [params.id, user]);

  const handleStatusChange = async (proposalId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/proposals/${proposalId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the local state to reflect the change
        setProposals(prevProposals =>
          prevProposals.map(proposal =>
            proposal.id === proposalId
              ? { ...proposal, status: newStatus }
              : proposal
          )
        );
      }
    } catch (error) {
      console.error('Error updating proposal status:', error);
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
            <Link href="/create" className="text-blue-600 hover:text-blue-800">
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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Project Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <Link href="/create" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
              ← Back to Projects
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4 dark:text-white">{project.title}</h1>
          
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

        {/* Proposals Section - Only visible to project owner */}
        {isOwner && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Proposals ({proposals.length})</h2>
            
            {proposals.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                No proposals received yet
              </p>
            ) : (
              <div className="space-y-6">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="border-b dark:border-gray-700 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={proposal.user.profileImage || '/default-avatar.png'}
                          alt={`${proposal.user.firstName} ${proposal.user.lastName}`}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold dark:text-white">
                            {proposal.user.firstName} {proposal.user.lastName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            @{proposal.user.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <select
                          value={proposal.status}
                          onChange={(e) => handleStatusChange(proposal.id, e.target.value)}
                          className="px-3 py-1 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accept</option>
                          <option value="rejected">Reject</option>
                        </select>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          proposal.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          proposal.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {proposal.coverLetter}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Submitted on {new Date(proposal.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 