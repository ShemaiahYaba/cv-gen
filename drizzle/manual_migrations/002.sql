-- ============================================
-- ADD SOFT DELETE COLUMN TO CVS TABLE
-- ============================================

-- Add deleted_at column for soft deletes
ALTER TABLE public.cvs ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

-- Create index for better query performance on non-deleted records
CREATE INDEX IF NOT EXISTS idx_cvs_deleted_at ON public.cvs(user_id, deleted_at) 
WHERE deleted_at IS NULL;

-- ============================================
-- UPDATE RLS POLICIES TO EXCLUDE SOFT-DELETED RECORDS
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own CVs" ON public.cvs;
DROP POLICY IF EXISTS "Users can insert their own CVs" ON public.cvs;
DROP POLICY IF EXISTS "Users can update their own CVs" ON public.cvs;
DROP POLICY IF EXISTS "Users can delete their own CVs" ON public.cvs;

-- Recreate policies with soft delete filtering
CREATE POLICY "Users can view their own CVs"
  ON public.cvs FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can insert their own CVs"
  ON public.cvs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own CVs"
  ON public.cvs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Keep delete policy for hard deletes if needed (e.g., admin operations)
-- But soft deletes are done through UPDATE, so this is rarely used
CREATE POLICY "Users can delete their own CVs"
  ON public.cvs FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- CREATE FUNCTION FOR PERMANENT CLEANUP (Optional)
-- Run this periodically via cron or manually
-- ============================================

-- Function to permanently delete CVs that have been soft-deleted for more than 30 days
CREATE OR REPLACE FUNCTION cleanup_deleted_cvs()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  WITH deleted AS (
    DELETE FROM public.cvs
    WHERE deleted_at IS NOT NULL
      AND deleted_at < NOW() - INTERVAL '30 days'
    RETURNING id
  )
  SELECT COUNT(*) INTO deleted_count FROM deleted;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- CREATE VIEW FOR ACTIVE CVS (Optional - for convenience)
-- ============================================

CREATE OR REPLACE VIEW public.active_cvs AS
SELECT 
  id,
  user_id,
  title,
  cv_type,
  template_id,
  content,
  is_favorite,
  created_at,
  updated_at,
  last_accessed_at
FROM public.cvs
WHERE deleted_at IS NULL;

-- Grant access to authenticated users
GRANT SELECT ON public.active_cvs TO authenticated;

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON COLUMN public.cvs.deleted_at IS 'Soft delete timestamp. NULL means the record is active.';
COMMENT ON FUNCTION cleanup_deleted_cvs() IS 'Permanently deletes CVs that have been soft-deleted for more than 30 days. Run periodically via cron.';
COMMENT ON VIEW public.active_cvs IS 'View of all active (non-deleted) CVs. Use this for simplified queries.';