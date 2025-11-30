BEGIN;

DROP VIEW IF EXISTS public.active_cvs;

CREATE VIEW public.active_cvs AS
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

-- Optional: set the owner (comment out if you prefer the current session user to own the view)
ALTER VIEW public.active_cvs OWNER TO postgres;

COMMIT;