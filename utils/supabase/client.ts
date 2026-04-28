// import { createClient } from "@supabase/supabase-js";

import { createBrowserClient } from "@supabase/ssr"

const supabaseUrl:any=process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey:any=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


export const supabase=createBrowserClient(supabaseUrl,supabaseAnonKey)