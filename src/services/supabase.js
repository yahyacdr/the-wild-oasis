import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://yezbpwvakkobookyvsdn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllemJwd3Zha2tvYm9va3l2c2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxNTgwMzEsImV4cCI6MjAzMDczNDAzMX0.SrOb9B6D7ssQRbJ2m1X1EAg549V1IbYJ0HKyLv_RrKs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
