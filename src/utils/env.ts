import { config } from 'dotenv';
import { resolve } from 'path';
import { existsSync } from 'fs';

// Load environment variables from .env files
// Priority: .env.local > .env

const envLocalPath = resolve(process.cwd(), '.env.local');
const envPath = resolve(process.cwd(), '.env');

// Try to load .env.local first (for local development)
if (existsSync(envLocalPath)) {
  config({ path: envLocalPath });
  console.error('✓ Loaded environment from .env.local');
} else if (existsSync(envPath)) {
  config({ path: envPath });
  console.error('✓ Loaded environment from .env');
} else {
  console.error('⚠ No .env file found, using system environment variables');
}

// Export configuration
export const env = {
  SERPAPI_KEY: process.env.SERPAPI_KEY || '',
  https_proxy: process.env.https_proxy || process.env.HTTPS_PROXY || 'http://localhost:1081',
  HTTP_TIMEOUT: parseInt(process.env.HTTP_TIMEOUT || '30000'),
};

// Validate required environment variables
if (!env.SERPAPI_KEY) {
  console.error('⚠ Warning: SERPAPI_KEY not set. SerpAPI search will not be available.');
  console.error('  Please set SERPAPI_KEY in .env.local or environment variables.');
}
