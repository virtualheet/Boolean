'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUserProfile } from '@/context/UserContext';

interface CustomProfile {
  about: string | null;
  socialLinks: string[];
  skills: string[];
  isFreelancer: boolean;
  isClient: boolean;
  contactInfo: string[];
  portfolioProjects: {
    title: string;
    description: string;
    link?: string;
  }[];
}

const ProfilePage = () => {
  const { firstName, lastName, fullName, email, profileImageUrl, loading } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [customProfile, setCustomProfile] = useState<CustomProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [username, setUsername] = useState('')

  const parseJsonField = (field: any): string[] => {
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const fetchCustomProfile = async () => {
    try {
      const response = await fetch('/api/users/profile');
      const responseProjects = await fetch('/api/users/portfolio');
      const data = await response.json();
      const dataProjects = await responseProjects.json();
      console.log("User Fetch ::" , data)
      console.log("Projects Fetch ::" , dataProjects)
      setCustomProfile({
        about: data.about || null,
        socialLinks: parseJsonField(data.socialLinks),
        skills: parseJsonField(data.skills),
        isFreelancer: Boolean(data.isFreelancer),
        isClient: Boolean(data.isClient),
        contactInfo: parseJsonField(data.contactInfo),
        portfolioProjects: Array.isArray(dataProjects) 
          ? dataProjects 
          : [],
      });
      setUsername(data.username || '')
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomProfile();
  }, []);

  const handleInputChange = (field: keyof CustomProfile, value: any) => {
    if (!customProfile) return;
    setCustomProfile({
      ...customProfile,
      [field]: value
    });
  };

  const handleArrayInputChange = (field: 'socialLinks' | 'skills' | 'contactInfo', value: string) => {
    if (!customProfile) return;
    setCustomProfile({
      ...customProfile,
      [field]: [...customProfile[field], value]
    });
  };

  const removeArrayItem = (field: 'socialLinks' | 'skills' | 'contactInfo', index: number) => {
    if (!customProfile) return;
    const newArray = [...customProfile[field]];
    newArray.splice(index, 1);
    setCustomProfile({
      ...customProfile,
      [field]: newArray
    });
  };

  const handlePortfolioProjectAdd = () => {
    if (!customProfile) return;
    setCustomProfile({
      ...customProfile,
      portfolioProjects: [
        ...customProfile.portfolioProjects,
        { title: '', description: '', link: '' }
      ]
    });
  };

  const handlePortfolioProjectChange = (index: number, field: 'title' | 'description' | 'link', value: string) => {
    if (!customProfile) return;
    const updatedProjects = [...customProfile.portfolioProjects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setCustomProfile({
      ...customProfile,
      portfolioProjects: updatedProjects
    });
  };

  const removePortfolioProject = (index: number) => {
    if (!customProfile) return;
    const updatedProjects = [...customProfile.portfolioProjects];
    updatedProjects.splice(index, 1);
    setCustomProfile({
      ...customProfile,
      portfolioProjects: updatedProjects
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customProfile),
      });

      if (response.ok) {
        setIsEditing(false);
        await fetchCustomProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading || profileLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!customProfile) {
    return <div className="flex justify-center items-center min-h-screen">Profile not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Profile</h1>
          <button
            onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="space-y-6">
          {/* Clerk User Information (Read-only) */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Basic Information</h2>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative w-16 h-16  ">
                <Image
                  src={profileImageUrl || '/default-avatar.png'}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                <p className="mt-1 dark:text-white">{firstName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                <p className="mt-1 dark:text-white">{lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <p className="mt-1 dark:text-white">{email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                <p className="mt-1 dark:text-white">{username}</p>
              </div>
            </div>
          </div>

          {/* Custom Profile Information (Editable) */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Additional Information</h2>
            
            {/* About */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About</label>
              {isEditing ? (
                <textarea
                  value={customProfile.about || ''}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
                  rows={4}
                />
              ) : (
                <p className="mt-1 dark:text-white">{customProfile.about}</p>
              )}
            </div>

            {/* Account Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
              {isEditing ? (
                <div className="space-x-4 mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={customProfile.isFreelancer}
                      onChange={(e) => handleInputChange('isFreelancer', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="dark:text-white">Freelancer</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={customProfile.isClient}
                      onChange={(e) => handleInputChange('isClient', e.target.checked)}
                      className="mr-2"
                    />
                    <span className="dark:text-white">Client</span>
                  </label>
                </div>
              ) : (
                <div className="mt-1">
                  {customProfile.isFreelancer && <span className="mr-2 dark:text-white">Freelancer</span>}
                  {customProfile.isClient && <span className="dark:text-white">Client</span>}
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
              <div className="mt-1 flex flex-wrap gap-2">
                {customProfile?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center"
                  >
                    <span className="dark:text-white">{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('skills', index)}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <input
                    type="text"
                    placeholder="Add skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleArrayInputChange('skills', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Social Links</label>
              <div className="mt-1 space-y-2">
                {customProfile?.socialLinks?.map((link, index) => (
                  <div key={index} className="flex items-center">
                    <span className="flex-1 dark:text-white">{link}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('socialLinks', index)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <input
                    type="text"
                    placeholder="Add social link"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleArrayInputChange('socialLinks', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Information</label>
              <div className="mt-1 space-y-2">
                {customProfile.contactInfo?.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <span className="flex-1 dark:text-white">{info}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeArrayItem('contactInfo', index)}
                        className="ml-2 text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <input
                    type="text"
                    placeholder="Add contact info"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleArrayInputChange('contactInfo', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Portfolio Projects */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold dark:text-white">Portfolio Projects</h2>
              {isEditing && (
                <button
                  onClick={handlePortfolioProjectAdd}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Project
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {customProfile.portfolioProjects.map((project, index) => (
                <div key={index} className="border dark:border-gray-600 rounded-lg p-4">
                  {isEditing ? (
                    <>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => handlePortfolioProjectChange(index, 'title', e.target.value)}
                          className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
                          placeholder="Project Title"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                          value={project.description}
                          onChange={(e) => handlePortfolioProjectChange(index, 'description', e.target.value)}
                          className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
                          rows={3}
                          placeholder="Project Description"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Link</label>
                        <input
                          type="text"
                          value={project.link}
                          onChange={(e) => handlePortfolioProjectChange(index, 'link', e.target.value)}
                          className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
                          placeholder="https://..."
                        />
                      </div>
                      <button
                        onClick={() => removePortfolioProject(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove Project
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold dark:text-white">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block"
                        >
                          View Project →
                        </a>
                      )}
                    </>
                  )}
                </div>
              ))}
              {!isEditing && customProfile.portfolioProjects.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No portfolio projects added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;