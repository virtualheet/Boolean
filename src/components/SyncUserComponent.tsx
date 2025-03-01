'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { useUser } from '@clerk/nextjs'

interface SyncUserComponentProps {
  id: string;
}

const SyncUserComponent = ({ id }: SyncUserComponentProps) => {
  const router = useRouter();
  const { user } = useUser();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/users/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          username: username,
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.emailAddresses[0]?.emailAddress || '',
          profileImage: user?.imageUrl || '',
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // Update Clerk username
        
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to sync user');
      }
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Choose a username to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                placeholder="Choose a username"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !username}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Setting up...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SyncUserComponent;