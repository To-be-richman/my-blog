import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pzirfzdtptusnembkaa.supabase.co";
const supabaseKey = "sb_publishable_jjUPTuDFbCJQj4d58oFiVw_hQZcgEVJ";

export const supabase = createClient(supabaseUrl, supabaseKey);