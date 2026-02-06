
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jrvpucthbcdpplkpquoe.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpydnB1Y3RoYmNkcHBsa3BxdW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMjU5ODcsImV4cCI6MjA4MzkwMTk4N30.LiXTX_Cczfq3bK7PlAdMuMbhKV_oYIUcQtZhnYOa8lk';

export const supabase = createClient(supabaseUrl, supabaseKey);
