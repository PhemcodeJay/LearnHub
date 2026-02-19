import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://bpsndexxtnxpuzwqawtx.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImUzZGUxYWI1LTY1ZDItNDI2OC05NjAwLTc0ZjQwNjFhY2RmZiJ9.eyJwcm9qZWN0SWQiOiJicHNuZGV4eHRueHB1endxYXd0eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcxMzYzODk1LCJleHAiOjIwODY3MjM4OTUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.opDqowBCIFTe0G_HYQl8-u69sDlhycHvhkYvGirseXs';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };