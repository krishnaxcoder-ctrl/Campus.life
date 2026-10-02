// Copy to config.js (gitignored) and fill in, so the admin pages connect without asking for a key.
// Without config.js the pages show a login card instead.
window.ADMIN_CONFIG = {
  supabaseUrl: 'https://jtcfcdqyzmixrsopyjgw.supabase.co',
  serviceRoleKey: '', // Supabase dashboard > Project Settings > API keys > service_role
};
