"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { WishlistEvent } from '@/services/wishlistService';
import { toast } from 'sonner';

export interface User {
  id: string;
  email?: string;
  created_at: string;
  full_name?: string;
  username?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  role?: string;
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
  role?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (userData: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  updateProfile: (
    profileData: Omit<ProfileFormState, "email">,
    avatarFile?: File | null
  ) => Promise<boolean>;
  profileForm: ProfileFormState;
  setProfileForm: (form: ProfileFormState) => void;
  wishlistEvents: WishlistEvent[];
  setWishlistEvents: (events: WishlistEvent[]) => void;
  isLoadingWishlist: boolean;
  setIsLoadingWishlist: (loading: boolean) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
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

  const [profileForm, setProfileForm] = useState<ProfileFormState>(defaultProfileForm);
  const [wishlistEvents, setWishlistEvents] = useState<WishlistEvent[]>([]);
  const [isLoadingWishlist, setIsLoadingWishlist] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData.user) {
          console.error('Error fetching auth user:', authError?.message);
          setUser(null);
          return;
        }

        const userId = authData.user.id;

        const { data: customUser, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (userError) {
          console.error('Error fetching user from users table:', userError.message);
          setUser(null);
          return;
        }

        const fullUser: User = {
          ...customUser,
          email: authData.user.email,
          wishlistCount: 0,
          bookedCount: 0
        };

        setUser(fullUser);

        setProfileForm({
          fullName: fullUser.full_name || '',
          username: fullUser.username || '',
          email: fullUser.email || '',
          phone: fullUser.phone || '',
          location: fullUser.location || '',
          bio: fullUser.bio || '',
        });

      } catch (error) {
        console.error('Error loading user:', error);
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
    profileData: Omit<ProfileFormState, "email">,
    avatarFile?: File | null
  ): Promise<boolean> => {
    if (!user) return false;

    setIsUpdatingProfile(true);
    try {
      let avatar_url = '';

      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, {
            cacheControl: "3600",
            upsert: true
          });

        if (uploadError) {
          console.error('Avatar upload error:', uploadError.message);
          setIsUpdatingProfile(false);
          return false;
        }

        const { data: publicUrlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatar_url = publicUrlData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: profileData.fullName,
          username: profileData.username,
          phone: profileData.phone,
          location: profileData.location,
          bio: profileData.bio,
          ...(profileData.role && { role: profileData.role }),
          ...(avatar_url && { avatar_url })
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('User update error:', updateError.message);
        setIsUpdatingProfile(false);
        return false;
      }

      toast.success('Profile updated!');
      setIsUpdatingProfile(false);
      return true;

    } catch (err) {
      console.error('Unexpected update error:', err);
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
