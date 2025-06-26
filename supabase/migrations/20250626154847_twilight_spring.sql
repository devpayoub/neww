/*
  # Create Admin User for Blog Management

  1. Admin User Setup
    - Create a user in auth.users for admin access
    - Set up proper authentication for the admin panel

  2. Security
    - Ensure admin user has proper permissions
    - Set up role-based access if needed

  Note: This creates a test admin user. In production, you should create 
  admin users through the Supabase dashboard or your application's signup flow.
*/

-- Insert admin user (this will be handled through Supabase Auth in the application)
-- The actual user creation should be done through the Supabase dashboard or auth flow

-- For now, we'll create a simple admin check function
CREATE OR REPLACE FUNCTION is_admin(user_email text)
RETURNS boolean AS $$
BEGIN
  -- Add admin emails here
  RETURN user_email IN (
    'admin@thinktrend.com',
    'info.thinktrend@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update policies to use admin check for write operations
DROP POLICY IF EXISTS "Categories are manageable by authenticated users" ON categories;
DROP POLICY IF EXISTS "Authors are manageable by authenticated users" ON authors;
DROP POLICY IF EXISTS "Posts are manageable by authenticated users" ON posts;

-- More restrictive policies for admin operations
CREATE POLICY "Categories are manageable by admins"
  ON categories
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Authors are manageable by admins"
  ON authors
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Posts are manageable by admins"
  ON posts
  FOR ALL
  TO authenticated
  USING (is_admin(auth.jwt() ->> 'email'))
  WITH CHECK (is_admin(auth.jwt() ->> 'email'));