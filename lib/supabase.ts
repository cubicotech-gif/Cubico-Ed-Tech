import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Database types ──────────────────────────────────────────────────────────

export interface PortfolioProject {
  id: string;
  title: string;
  category: 'LMS' | 'Animation' | 'Apps' | 'Content';
  description: string;
  tags: string[];
  image_url: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  institution: string;
  service: string;
  message: string;
  created_at?: string;
}

// ── Portfolio helpers ───────────────────────────────────────────────────────

export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching portfolio projects:', error.message);
    return [];
  }

  return data ?? [];
}

// ── Contact helpers ─────────────────────────────────────────────────────────

export async function submitContactForm(
  submission: Omit<ContactSubmission, 'id' | 'created_at'>
): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('contact_submissions')
    .insert([submission]);

  if (error) {
    console.error('Error submitting contact form:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ── Storage helpers ─────────────────────────────────────────────────────────

/**
 * Returns a public URL for a file in the "portfolio" storage bucket.
 */
export function getPortfolioImageUrl(filename: string): string {
  const { data } = supabase.storage.from('portfolio').getPublicUrl(filename);
  return data.publicUrl;
}
