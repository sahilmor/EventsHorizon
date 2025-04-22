import { atom } from 'recoil';
import { WishlistEvent } from '@/services/wishlistService';

export interface ProfileFormState {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export const profileFormState = atom<ProfileFormState>({
  key: 'profileFormState',
  default: {
    fullName: '',
    username: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
  },
});

export const wishlistEventsState = atom<WishlistEvent[]>({
  key: 'wishlistEventsState',
  default: [],
});

export const isLoadingWishlistState = atom<boolean>({
  key: 'isLoadingWishlistState',
  default: true,
});

export const isDialogOpenState = atom<boolean>({
  key: 'isDialogOpenState',
  default: false,
});

export const isUpdatingProfileState = atom<boolean>({
  key: 'isUpdatingProfileState',
  default: false,
}); 