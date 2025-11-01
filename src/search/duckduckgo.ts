import * as cheerio from 'cheerio';
import { SearchEngine, SearchResult, SearchOptions } from './base.js';

export class DuckDuckGoSearch extends SearchEngine {
  constructor() {
    super('DuckDuckGo');
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    const { maxResults = 10 } = options;

    try {
      const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
      const html = await this.httpClient.post(url, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const $ = cheerio.load(html);
      const results: SearchResult[] = [];

      $('.result').each((_, element) => {
        if (results.length >= maxResults) return false;

        const $result = $(element);
        const $title = $result.find('.result__a');
        const $snippet = $result.find('.result__snippet');

        const title = this.cleanText($title.text());
        const url = $title.attr('href');
        const snippet = this.cleanText($snippet.text());

        if (title && url) {
          results.push({
            title,
            url,
            snippet: snippet || '',
            engine: this.name,
          });
        }
      });

      return this.validateResults(results);
    } catch (error) {
      throw new Error(`DuckDuckGo search failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
