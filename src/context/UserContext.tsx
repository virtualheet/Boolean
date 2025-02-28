'use client';

import React, { createContext, useContext } from 'react';
import { useUser } from '@clerk/nextjs';

interface UserContextType {
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  username: string | null;
  email: string | null;
  profileImageUrl: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();

  const userInfo: UserContextType = {
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    fullName: user?.fullName || null,
    username: user?.username || null,
    email: user?.primaryEmailAddress?.emailAddress || null,
    profileImageUrl: user?.imageUrl || null,
    loading: !isLoaded
  };

  return (
    <UserContext.Provider value={userInfo}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
} 