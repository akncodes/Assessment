import { NextResponse, type NextRequest } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

function getSafeNextPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/dashboard";
  }

  return value;
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const nextPath = getSafeNextPath(request.nextUrl.searchParams.get("next"));
  const redirectUrl = new URL(nextPath, request.url);

  if (!supabase) {
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("error", "missing-supabase-env");
    return NextResponse.redirect(redirectUrl);
  }

  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("error", "missing-code");
    return NextResponse.redirect(redirectUrl);
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("error", "verification-failed");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(redirectUrl);
}