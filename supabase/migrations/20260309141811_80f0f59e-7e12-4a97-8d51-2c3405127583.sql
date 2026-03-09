
-- Create feedback table
CREATE TABLE public.storyboard_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  excitement_trigger TEXT,
  dropoff_moment TEXT,
  anxiety_spike TEXT,
  implementation_gap TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.storyboard_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public feedback form)
CREATE POLICY "Anyone can submit feedback"
  ON public.storyboard_feedback
  FOR INSERT
  WITH CHECK (true);

-- Only allow reading via admin/service role (not public)
CREATE POLICY "No public reads"
  ON public.storyboard_feedback
  FOR SELECT
  USING (false);
