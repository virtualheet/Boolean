'use client';

import { useEffect, useState } from 'react';
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

const UserAllCreatedProjected = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/jobs/user-projects');
        const data = await response.json();
        
        if (response.ok) {
          setProjects(data.projects);
        } else {
          setError(data.error || 'Failed to fetch projects');
        }
      } catch (error) {
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">No Projects Yet</h2>
        <p className="text-gray-600 dark:text-gray-300">Start by creating your first project!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Your Created Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Budget:</span>
                  <span className="font-medium dark:text-white">${project.pricing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">Duration:</span>
                  <span className="font-medium dark:text-white">{project.duration}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {JSON.parse(project.skills).slice(0, 3).map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserAllCreatedProjected;