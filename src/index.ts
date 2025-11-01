#!/usr/bin/env node

// Load environment variables first
import './utils/env.js';

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { SearchManager, EngineType } from './search/manager.js';

const searchManager = new SearchManager();

const SEARCH_TOOL: Tool = {
  name: 'web_search',
  description: 'Search the web using various search engines. Returns structured results with title, URL, and snippet.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query to execute',
      },
      engine: {
        type: 'string',
        enum: ['auto', 'serpapi', 'baidu', 'google', 'duckduckgo', 'searxng'],
        description: 'Search engine to use (default: auto - tries all engines with fallback). SerpAPI requires SERPAPI_KEY environment variable.',
        default: 'auto',
      },
      max_results: {
        type: 'number',
        description: 'Maximum number of results to return (default: 10)',
        default: 10,
        minimum: 1,
        maximum: 50,
      },
      language: {
        type: 'string',
        description: 'Language preference (default: en)',
        default: 'en',
      },
    },
    required: ['query'],
  },
};

async function main() {
  const server = new Server(
    {
      name: 'search-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [SEARCH_TOOL],
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'web_search') {
      const { query, engine = 'auto', max_results = 10, language = 'en' } = request.params.arguments as {
        query: string;
        engine?: EngineType;
        max_results?: number;
        language?: string;
      };

      try {
        const results = await searchManager.search(query, engine, {
          maxResults: max_results,
          language,
        });

        if (results.length === 0) {
          return {
            content: [
              {
                type: 'text',
                text: `No results found for query: "${query}"`,
              },
            ],
          };
        }

        // Format results as markdown
        let markdown = `# Search Results for: "${query}"\n\n`;
        markdown += `Found ${results.length} result(s) using ${engine === 'auto' ? results[0]?.engine || 'auto' : engine}\n\n`;

        results.forEach((result, index) => {
          markdown += `## ${index + 1}. ${result.title}\n`;
          markdown += `**URL:** ${result.url}\n\n`;
          if (result.snippet) {
            markdown += `${result.snippet}\n\n`;
          }
          markdown += '---\n\n';
        });

        return {
          content: [
            {
              type: 'text',
              text: markdown,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Search failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }

    throw new Error(`Unknown tool: ${request.params.name}`);
  });

  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('Search MCP server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
