import { supabase } from '@/lib/supabase';

export interface WishlistEvent {
  id: string;
  event_id: string;
  created_at: string;
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image_url: string;
    price: number;
  };
}

export const wishlistService = {
  // Get all wishlist items for a user
  async getUserWishlist(userId: string): Promise<WishlistEvent[]> {
    const { data, error } = await supabase
      .from('wishlists')
      .select(`
        id,
        event_id,
        created_at,
        event:events (
          id,
          title,
          description,
          date,
          location,
          image_url,
          price
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching wishlist:', error);
      throw error;
    }

    // Transform the data to match the WishlistEvent interface
    return (data || []).map(item => ({
      ...item,
      event: Array.isArray(item.event) ? item.event[0] : item.event
    }));
  },

  // Add an event to wishlist
  async addToWishlist(userId: string, eventId: string): Promise<boolean> {
    const { error } = await supabase
      .from('wishlists')
      .insert({ user_id: userId, event_id: eventId });

    if (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }

    return true;
  },

  // Remove an event from wishlist
  async removeFromWishlist(userId: string, eventId: string): Promise<boolean> {
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId);

    if (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }

    return true;
  },

  // Check if an event is in user's wishlist
  async isInWishlist(userId: string, eventId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('wishlists')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking wishlist status:', error);
      return false;
    }

    return !!data;
  },

  // Get wishlist count for a user
  async getWishlistCount(userId: string): Promise<number> {
    const { data, error } = await supabase
      .rpc('get_user_wishlist_count', { user_id: userId });

    if (error) {
      console.error('Error getting wishlist count:', error);
      return 0;
    }

    return data || 0;
  }
}; 