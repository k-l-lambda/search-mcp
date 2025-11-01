import { SearchEngine, SearchResult, SearchOptions } from './base.js';
import { DuckDuckGoSearch } from './duckduckgo.js';
import { SearXNGSearch } from './searxng.js';
import { GoogleSearch } from './google.js';
import { BaiduSearch } from './baidu.js';
import { SerpAPISearch } from './serpapi.js';

export type EngineType = 'duckduckgo' | 'searxng' | 'google' | 'baidu' | 'serpapi' | 'auto';

export class SearchManager {
  private engines: Map<string, SearchEngine>;

  constructor() {
    this.engines = new Map();

    // Try SerpAPI first if API key is available
    if (process.env.SERPAPI_KEY) {
      this.engines.set('serpapi', new SerpAPISearch());
    }

    // Fallback engines
    this.engines.set('baidu', new BaiduSearch());
    this.engines.set('google', new GoogleSearch());
    this.engines.set('duckduckgo', new DuckDuckGoSearch());
    this.engines.set('searxng', new SearXNGSearch());
  }

  async search(
    query: string,
    engine: EngineType = 'auto',
    options: SearchOptions = {}
  ): Promise<SearchResult[]> {
    if (engine === 'auto') {
      return this.searchWithFallback(query, options);
    }

    const searchEngine = this.engines.get(engine);
    if (!searchEngine) {
      throw new Error(`Unknown search engine: ${engine}`);
    }

    try {
      return await searchEngine.search(query, options);
    } catch (error) {
      throw new Error(
        `Search failed with ${engine}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  private async searchWithFallback(
    query: string,
    options: SearchOptions
  ): Promise<SearchResult[]> {
    const engineOrder: string[] = [];

    // Prioritize SerpAPI if available
    if (process.env.SERPAPI_KEY) {
      engineOrder.push('serpapi');
    }

    // Add fallback engines
    engineOrder.push('baidu', 'google', 'duckduckgo', 'searxng');

    for (const engineName of engineOrder) {
      try {
        const engine = this.engines.get(engineName);
        if (!engine) continue;

        const results = await engine.search(query, options);
        if (results.length > 0) {
          return results;
        }
      } catch (error) {
        console.error(`Engine ${engineName} failed:`, error);
        continue;
      }
    }

    throw new Error('All search engines failed');
  }

  listEngines(): string[] {
    return Array.from(this.engines.keys());
  }
}
