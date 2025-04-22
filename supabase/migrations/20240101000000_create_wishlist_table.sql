-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS wishlists_user_id_idx ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS wishlists_event_id_idx ON wishlists(event_id);

-- Create RLS policies
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own wishlist items
CREATE POLICY "Users can view their own wishlist items" 
  ON wishlists FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own wishlist items
CREATE POLICY "Users can insert their own wishlist items" 
  ON wishlists FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own wishlist items
CREATE POLICY "Users can delete their own wishlist items" 
  ON wishlists FOR DELETE 
  USING (auth.uid() = user_id);

-- Function to get wishlist count for a user
CREATE OR REPLACE FUNCTION get_user_wishlist_count(user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM wishlists WHERE wishlists.user_id = $1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 