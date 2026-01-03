import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';

// Get the directory of this file (works with ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env files
// Priority: .env.local > .env
// Use script directory instead of cwd() so MCP server finds the config

const scriptDir = resolve(__dirname, '../..');  // Go up from dist/utils to project root
const envLocalPath = resolve(scriptDir, '.env.local');
const envPath = resolve(scriptDir, '.env');

// Try to load .env.local first (for local development)
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath });
  console.error('✓ Loaded environment from', envLocalPath);
} else if (existsSync(envPath)) {
  config({ path: envPath });
  console.error('✓ Loaded environment from', envPath);
} else {
  console.error('⚠ No .env file found at', scriptDir);
}

// Export configuration
export const env = {
  SERPAPI_KEY: process.env.SERPAPI_KEY || '',
  https_proxy: process.env.https_proxy || process.env.HTTPS_PROXY || 'http://localhost:1091',
  HTTP_TIMEOUT: parseInt(process.env.HTTP_TIMEOUT || '30000'),
};

// Validate required environment variables
if (!env.SERPAPI_KEY) {
  console.error('⚠ Warning: SERPAPI_KEY not set. SerpAPI search will not be available.');
}
