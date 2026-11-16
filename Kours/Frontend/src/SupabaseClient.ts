import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://otolyltktrtwxhcxpvmc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_aQBgEh2n7H7WC_cBovafZQ_hk4Ls45k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);