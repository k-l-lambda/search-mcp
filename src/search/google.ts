import * as cheerio from 'cheerio';
import { SearchEngine, SearchResult, SearchOptions } from './base.js';

export class GoogleSearch extends SearchEngine {
  constructor() {
    super('Google');
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    const { maxResults = 10, language = 'en' } = options;

    try {
      // Use Google search without requiring API key
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=${language}&num=${maxResults}`;
      const html = await this.httpClient.get(url);

      const $ = cheerio.load(html);
      const results: SearchResult[] = [];

      // Google search results are in divs with class 'g'
      $('div.g').each((_, element) => {
        if (results.length >= maxResults) return false;

        const $result = $(element);
        const $title = $result.find('h3');
        const $link = $result.find('a');
        const $snippet = $result.find('div[data-sncf="1"], .VwiC3b, div.VwiC3b');

        const title = this.cleanText($title.text());
        const url = $link.attr('href');
        const snippet = this.cleanText($snippet.text());

        if (title && url && url.startsWith('http')) {
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
      throw new Error(`Google search failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
