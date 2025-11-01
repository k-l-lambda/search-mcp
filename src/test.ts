// Load environment variables first
import './utils/env.js';
import { SearchManager } from './search/manager.js';

async function testSearch() {
  console.log('Testing Search MCP Server...\n');

  const manager = new SearchManager();

  // Test query
  const query = '今天黄金价格';
  console.log(`Search query: "${query}"\n`);

  try {
    console.log('Searching with auto engine (fallback enabled)...');
    const results = await manager.search(query, 'auto', { maxResults: 5 });

    console.log(`\nFound ${results.length} results:\n`);

    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.title}`);
      console.log(`   URL: ${result.url}`);
      console.log(`   Engine: ${result.engine}`);
      if (result.snippet) {
        console.log(`   Snippet: ${result.snippet.substring(0, 100)}...`);
      }
      console.log('');
    });

    console.log('✓ Search test passed!');
  } catch (error) {
    console.error('✗ Search test failed:');
    console.error(error);
    process.exit(1);
  }
}

testSearch();
