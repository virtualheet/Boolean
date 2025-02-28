// components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import useSound from 'use-sound';
import { Button } from './ui/button';

const Navbar = () => {
    const { user } = useUser();
    const { theme, toggleTheme } = useTheme();
    const [playsound] = useSound('/audios/light.mp3')
    const [mounted, setMounted] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Ensure theme toggle only works client-side
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const isCtrlOrCmdPressed = isMac ? event.metaKey : event.ctrlKey;

            if (isCtrlOrCmdPressed && event.key.toLowerCase() === 'i') {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-[9998] w-full  bg-transparent dark:bg-transparent transition-colors duration-200">
            <div className="w-[50%] border-2 bg-white dark:bg-black border-black/20 dark:border-white/40 rounded-2xl mx-auto px-4 sm:px-6 lg:px-2">
                <div className="flex items-center justify-between h-12">
                    {/* Logo and project name */}
                    <div className="flex items-center"
                        style={{
                            gap: 'clamp(1rem,1vw,200rem)'
                        }}
                    >
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src='/logo/logo.svg'
                                    width={100}
                                    height={100}
                                    alt='logo'
                                    className='w-10 border-2  border-black dark:border-white rounded-xl '
                                />
                                {/* <span className="text-gray-900 dark:text-white font-medium text-lg">
                                    Boolean
                                    </span> */}
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:block text-base text-black dark:text-white">
                            <div className=" flex items-center"
                                style={{
                                    gap: 'clamp(1rem,1vw,200rem)'
                                }}
                            >

                                <Link href="/features" className="rounded-md  font-medium transition-all duration-300  hover:text-indigo-600 dark:hover:text-indigo-400">
                                    Explore
                                </Link>
                                <Link href="/about" className=" rounded-md  font-medium transition-all duration-300   hover:text-indigo-600 dark:hover:text-indigo-400">
                                    About
                                </Link>
                                <Link href="/contact" className=" rounded-md  font-medium  transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                                    Contact
                                </Link>
                                <Link href={`/profile/${user?.username}`} className=" rounded-md  font-medium  transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                                    Profile
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                    <div className="flex"
                        style={{
                            gap: 'clamp(0.5rem,0.5vw,200rem)'
                        }}
                    >
                        <div className="flex h-10 border-2 overflow-hidden text-base border-black/20 dark:border-white/40 rounded-xl">
                            <input
                                type="text"
                                placeholder="search                  Cntrl + I"
                                ref={searchInputRef}
                                className="flex-grow px-4 text-black bg-transparent focus:outline-none"
                            />
                            <div className='bg-black  dark:bg-white text-white dark:text-black cursor-pointer w-10 flex text-lg items-center justify-center'>
                                <Search className="m-2" />
                            </div>
                        </div>

                        {/* Right side buttons */}
                        <div className="flex items-center "
                            style={{
                                gap: 'clamp(0.5rem,0.5vw,200rem)'
                            }}
                        >
                            {/* Theme toggle button */}
                            <button
                                onClick={() => {
                                    toggleTheme();
                                    playsound();
                                }}
                                className="w-10 h-10 border-2 items-center flex justify-center text-2xl border-black/40 dark:border-white/40 rounded-xl  text-black dark:text-white  focus:outline-none"
                                aria-label="Toggle dark mode"
                            >
                                {mounted && (
                                    theme === 'dark' ?
                                        <Moon /> :
                                        <Sun />
                                )}
                            </button>

                            {/* User button */}
                            <div className="flex items-center">
                                {user ? <UserButton

                                    appearance={{
                                        elements: {
                                            rootBox: 'hover:opacity-80 transition-opacity',
                                            avatarBox: 'w-10 h-10 rounded-xl',
                                        }
                                    }}
                                /> : <Link href={'/sign-in'}
                                >
                                    <Button className='h-full'>
                                        Login
                                    </Button>
                                </Link>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;