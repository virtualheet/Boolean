'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

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

export default function ProjectDetails() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
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
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
    </div>
  );
} 