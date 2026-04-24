export function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function getSupabaseSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://assessment1-sooty-chi.vercel.app";
}

export function getEnv() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    siteUrl: getSupabaseSiteUrl(),
    googleAiApiKey: process.env.GOOGLE_AI_API_KEY ?? "",
  };
}
