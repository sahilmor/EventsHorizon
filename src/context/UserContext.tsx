"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { WishlistEvent } from '@/services/wishlistService';

export interface UserMetadata {
  full_name?: string;
  username?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
}

export interface User {
  id: string;
  email?: string;
  user_metadata: UserMetadata;
  created_at: string;
  wishlistCount?: number;
  bookedCount?: number;
}

export interface ProfileFormState {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  updateProfile: (metadata: Partial<UserMetadata>, avatarFile?: File | null) => Promise<boolean>;
  // Profile form state
  profileForm: ProfileFormState;
  setProfileForm: (form: ProfileFormState) => void;
  // Wishlist state
  wishlistEvents: WishlistEvent[];
  setWishlistEvents: (events: WishlistEvent[]) => void;
  isLoadingWishlist: boolean;
  setIsLoadingWishlist: (loading: boolean) => void;
  // Dialog state
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  // Profile update state
  isUpdatingProfile: boolean;
  setIsUpdatingProfile: (updating: boolean) => void;
}

const defaultProfileForm: ProfileFormState = {
  fullName: '',
  username: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Profile form state
  const [profileForm, setProfileForm] = useState<ProfileFormState>(defaultProfileForm);
  
  // Wishlist state
  const [wishlistEvents, setWishlistEvents] = useState<WishlistEvent[]>([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Profile update state
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error.message);
          setUser(null);
        } else if (data.user) {
          // Map Supabase user to our User type
          const userData: User = {
            id: data.user.id,
            email: data.user.email,
            user_metadata: data.user.user_metadata || {},
            created_at: data.user.created_at,
            wishlistCount: 0,
            bookedCount: 0
          };
          setUser(userData);
          
          // Update profile form with user data
          setProfileForm({
            fullName: userData.user_metadata.full_name || '',
            username: userData.user_metadata.username || '',
            email: userData.email || '',
            phone: userData.user_metadata.phone || '',
            location: userData.user_metadata.location || '',
            bio: userData.user_metadata.bio || '',
          });
        }
      } catch (error) {
        console.error('Error in loadUser:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateUser = (userData: User | null) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (
    metadata: Partial<UserMetadata>,
    avatarFile?: File | null
  ): Promise<boolean> => {
    if (!user) return false;

    setIsUpdatingProfile(true);
    try {
      // Update user metadata
      const { error: metadataError } = await supabase.auth.updateUser({
        data: metadata
      });

      if (metadataError) {
        console.error('Error updating user metadata:', metadataError.message);
        setIsUpdatingProfile(false);
        return false;
      }

      // Handle avatar upload if provided
      if (avatarFile) {
        try {
          const fileExt = avatarFile.name.split('.').pop();
          const fileName = `${Date.now()}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          // Upload new avatar
          const { data: avatarData, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, avatarFile, {
              cacheControl: "3600",
              upsert: true
            });

          if (uploadError) {
            console.error('Error uploading avatar:', uploadError.message);
            setIsUpdatingProfile(false);
            return false;
          }

          const { data: publicUrlData } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(filePath);

          // Update user with new avatar URL
          const { error: avatarUpdateError } = await supabase.auth.updateUser({
            data: {
              avatar_url: publicUrlData.publicUrl
            }
          });

          if (avatarUpdateError) {
            console.error('Error updating avatar URL:', avatarUpdateError.message);
            setIsUpdatingProfile(false);
            return false;
          }
        } catch (error) {
          console.error('Unexpected error during avatar update:', error);
          setIsUpdatingProfile(false);
          return false;
        }
      }

      // Refetch updated user
      const { data: refreshedUser, error: refreshError } = await supabase.auth.getUser();
      
      if (refreshError) {
        console.error('Error refreshing user:', refreshError.message);
        setIsUpdatingProfile(false);
        return false;
      }
      
      if (!refreshedUser.user) {
        setIsUpdatingProfile(false);
        return false;
      }
      
      // Map Supabase user to our User type
      const updatedUser: User = {
        id: refreshedUser.user.id,
        email: refreshedUser.user.email,
        user_metadata: refreshedUser.user.user_metadata || {},
        created_at: refreshedUser.user.created_at,
        wishlistCount: 0, // Default values
        bookedCount: 0
      };
      
      setUser(updatedUser);
      
      // Update profile form with refreshed user data
      setProfileForm({
        fullName: updatedUser.user_metadata.full_name || '',
        username: updatedUser.user_metadata.username || '',
        email: updatedUser.email || '',
        phone: updatedUser.user_metadata.phone || '',
        location: updatedUser.user_metadata.location || '',
        bio: updatedUser.user_metadata.bio || '',
      });
      
      setIsUpdatingProfile(false);
      return true;
    } catch (error) {
      console.error('Unexpected error during profile update:', error);
      setIsUpdatingProfile(false);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        updateUser,
        setLoading,
        logout,
        updateProfile,
        profileForm,
        setProfileForm,
        wishlistEvents,
        setWishlistEvents,
        isLoadingWishlist,
        setIsLoadingWishlist,
        isDialogOpen,
        setIsDialogOpen,
        isUpdatingProfile,
        setIsUpdatingProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 