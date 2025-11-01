import * as cheerio from 'cheerio';
import { SearchEngine, SearchResult, SearchOptions } from './base.js';

export class SearXNGSearch extends SearchEngine {
  private instances = [
    'https://searx.be',
    'https://searx.work',
    'https://search.sapti.me',
  ];

  constructor() {
    super('SearXNG');
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    const { maxResults = 10, language = 'en' } = options;

    // Try each instance until one works
    for (const instance of this.instances) {
      try {
        const results = await this.searchInstance(instance, query, maxResults, language);
        if (results.length > 0) {
          return results;
        }
      } catch (error) {
        // Continue to next instance
        console.error(`Failed to search ${instance}:`, error);
        continue;
      }
    }

    throw new Error('All SearXNG instances failed');
  }

  private async searchInstance(
    instance: string,
    query: string,
    maxResults: number,
    language: string
  ): Promise<SearchResult[]> {
    const url = `${instance}/search?q=${encodeURIComponent(query)}&format=html&language=${language}`;
    const html = await this.httpClient.get(url);

    const $ = cheerio.load(html);
    const results: SearchResult[] = [];

    $('.result').each((_, element) => {
      if (results.length >= maxResults) return false;

      const $result = $(element);
      const $title = $result.find('h3 a, .result_title a, h4 a');
      const $snippet = $result.find('.content, .result-content, p.content');

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
  }
}
