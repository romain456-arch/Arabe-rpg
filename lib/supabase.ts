import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ntgijqfcafwmoyewpqbbj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjZTQ0Y2ItNDE3NC00ZWIxLTk4M2EtOTUyN2VlODg4NzA=';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
