import { atom, selector } from 'recoil';
import { supabase } from '@/lib/supabase';

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

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const userLoadingState = atom<boolean>({
  key: 'userLoadingState',
  default: false,
});

export const userProfileSelector = selector({
  key: 'userProfileSelector',
  get: ({ get }) => {
    const user = get(userState);
    if (!user) return null;
    
    return {
      fullName: user.user_metadata.full_name || '',
      email: user.email || '',
      phone: user.user_metadata.phone || '',
      location: user.user_metadata.location || '',
      bio: user.user_metadata.bio || '',
      avatarUrl: user.user_metadata.avatar_url || '',
    };
  },
});

export const fetchUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
  
  if (!data.user) return null;
  
  // Map Supabase user to our User type
  const user: User = {
    id: data.user.id,
    email: data.user.email,
    user_metadata: data.user.user_metadata || {},
    created_at: data.user.created_at,
    wishlistCount: 0, // Default values
    bookedCount: 0
  };
  
  return user;
};

export const updateUserProfile = async (
  userId: string,
  metadata: Partial<UserMetadata>,
  avatarFile?: File | null
) => {
  // Update user metadata
  const { data: updatedUserData, error: metadataError } = await supabase.auth.updateUser({
    data: metadata
  });

  if (metadataError) {
    console.error('Error updating user metadata:', metadataError.message);
    return { success: false, error: metadataError };
  }

  // Handle avatar upload if provided
  if (avatarFile) {
    try {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      // Upload new avatar
      const { data: avatarData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, {
          cacheControl: "3600",
          upsert: true
        });

      if (uploadError) {
        console.error('Error uploading avatar:', uploadError.message);
        return { success: false, error: uploadError };
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
        return { success: false, error: avatarUpdateError };
      }
    } catch (error) {
      console.error('Unexpected error during avatar update:', error);
      return { success: false, error };
    }
  }

  // Refetch updated user
  const { data: refreshedUser, error: refreshError } = await supabase.auth.getUser();
  
  if (refreshError) {
    console.error('Error refreshing user:', refreshError.message);
    return { success: false, error: refreshError };
  }
  
  if (!refreshedUser.user) {
    return { success: false, error: new Error('No user data returned') };
  }
  
  // Map Supabase user to our User type
  const user: User = {
    id: refreshedUser.user.id,
    email: refreshedUser.user.email,
    user_metadata: refreshedUser.user.user_metadata || {},
    created_at: refreshedUser.user.created_at,
    wishlistCount: 0, // Default values
    bookedCount: 0
  };

  return { success: true, user };
}; 