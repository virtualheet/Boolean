'use client'

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { UserButton, UserProfile } from "@clerk/clerk-react";

const ProfilePage = () => {
    const { username } = useParams();
    const { user } = useUser();
    const [darkMode, setDarkMode] = useState(true);


    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
        }
    }, []);

    // Update localStorage and document class when theme changes
    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    // Sample data - in a real app, this would come from an API or database
    const profileData = {
        name: "Heet",
        description: "Hey! I'm heeet, a software developer.",
        avatarUrl: "/avatar.jpg", // Replace with actual path to avatar image
        coverImageUrl: "/cover.jpg", // Replace with actual path to cover image
        projects: [
            {
                id: 1,
                name: "Ship",
                description: "An app for seamless file transfers over Wi-Fi",
                link: "/projects/ship"
            },
            {
                id: 2,
                name: "Vibe",
                description: "Let Your Votes Choose the Beat",
                link: "/projects/vibe"
            },
            {
                id: 3,
                name: "hmm-api",
                description: "Package for seamless error handling and toasts for API calls",
                link: "/projects/hmm-api"
            }
        ],
        socialLinks: [
            { name: "Twitter", url: "https://twitter.com/username", icon: "Twitter" },
            { name: "GitHub", url: "https://github.com/username", icon: "GitHub" },
            { name: "Instagram", url: "https://instagram.com/username", icon: "Instagram" }
        ]
    };

    return (
        <div className="flex pop justify-center">
            <div className="min-h-screen  mt-5  w-[50%] bg-transparent text-black dark:text-white transition-colors duration-300 relative font-inter">
                <header className="relative h-16 mb-5 bg-transparent border-b border-gray-200 dark:border-gray-700">
                    {/* Optionally, you can add a cover image here with transparent settings */}
                    <div className="flex items-center">
                        <UserButton
                            userProfileMode="navigation"
                            userProfileUrl="#"
                            appearance={{
                                elements: {
                                    rootBox: 'hover:opacity-80 transition-opacity',
                                    avatarBox: 'w-16 h-16 rounded-full',
                                },
                            }}
                        />

                    </div>
                </header>

                {/* Content */}
                <main className="">
                    {/* Profile section */}
                    <div className="mb-6">
                        {/* Avatar */}
                        {/* <Image 
            src={user.profileImageUrl} 
            alt="Cover" 
            fill 
            className="object-cover opacity-50" 
          />  */}
                        {/* Name and bio */}
                        <h1 className="text-2xl font-semibold mb-1 capitalize">{user?.id} {user?.lastName}</h1>
                        <p className="text-base text-gray-600 dark:text-gray-400 mb-8">{profileData.description}</p>
                    </div>

                    {/* Projects section */}
                    <section>
                        <h2 className="text-xl font-semibold mt-4 mb-4">Projects</h2>
                        <div>
                            {profileData.projects.map(project => (
                                <div key={project.id} className="border-t cursor-pointer hover:bg-white/10 rounded-2xl transition-all duration-300 border-gray-200 dark:border-gray-700 py-4">
                                    <a
                                        href={project.link}
                                        className="text-base font-medium text-black dark:text-white  transition"
                                    >
                                        {project.name}
                                    </a>
                                    <p className="text-sm text-gray-600 dark:text-white/60">{project.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Social links */}
                    <section className="flex gap-6 mt-8 mb-8">
                        {profileData.socialLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.url}
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
