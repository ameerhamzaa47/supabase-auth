'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xoaviixgmtshuuliugtr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvYXZpaXhnbXRzaHV1bGl1Z3RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTk2NzAsImV4cCI6MjA2OTM3NTY3MH0.kbptfbg4tn1mTtaJExVwlMsACcEzY0Nt0hC0v1rVTQ8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
