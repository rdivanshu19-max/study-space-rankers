
-- Create materials table (shared across all users)
CREATE TABLE public.materials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  link TEXT NOT NULL,
  types TEXT[] NOT NULL DEFAULT '{}',
  pinned BOOLEAN NOT NULL DEFAULT false,
  rating_enabled BOOLEAN NOT NULL DEFAULT true,
  ratings INTEGER[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create app_settings table
CREATE TABLE public.app_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Materials are readable by everyone (public study resources)
CREATE POLICY "Materials are viewable by everyone"
  ON public.materials FOR SELECT USING (true);

-- Anyone can insert materials (admin check is done client-side with password)
CREATE POLICY "Anyone can insert materials"
  ON public.materials FOR INSERT WITH CHECK (true);

-- Anyone can update materials (for ratings, pins)
CREATE POLICY "Anyone can update materials"
  ON public.materials FOR UPDATE USING (true);

-- Anyone can delete materials (admin check client-side)
CREATE POLICY "Anyone can delete materials"
  ON public.materials FOR DELETE USING (true);

-- Settings readable by everyone
CREATE POLICY "Settings are viewable by everyone"
  ON public.app_settings FOR SELECT USING (true);

CREATE POLICY "Anyone can insert settings"
  ON public.app_settings FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update settings"
  ON public.app_settings FOR UPDATE USING (true);

-- Insert default settings
INSERT INTO public.app_settings (key, value) VALUES ('ratingEnabled', 'true');
