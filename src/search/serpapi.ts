import { SearchEngine, SearchResult, SearchOptions } from './base.js';

export class SerpAPISearch extends SearchEngine {
  private apiKey: string;

  constructor() {
    super('SerpAPI');
    this.apiKey = process.env.SERPAPI_KEY || '';
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    if (!this.apiKey) {
      throw new Error('SERPAPI_KEY environment variable is not set');
    }

    const { maxResults = 10, language = 'en' } = options;

    try {
      const params = new URLSearchParams({
        engine: 'google',
        q: query,
        api_key: this.apiKey,
        num: String(Math.min(maxResults, 100)),
        hl: language,
      });

      const url = `https://serpapi.com/search.json?${params.toString()}`;
      const text = await this.httpClient.get(url);
      const response = JSON.parse(text);

      const results: SearchResult[] = [];

      if (response.organic_results) {
        for (const item of response.organic_results) {
          if (results.length >= maxResults) break;

          results.push({
            title: item.title || '',
            url: item.link || '',
            snippet: item.snippet || '',
            engine: this.name,
          });
        }
      }

      return this.validateResults(results);
    } catch (error) {
      throw new Error(`SerpAPI search failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
