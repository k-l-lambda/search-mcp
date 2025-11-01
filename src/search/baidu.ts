import * as cheerio from 'cheerio';
import { SearchEngine, SearchResult, SearchOptions } from './base.js';

export class BaiduSearch extends SearchEngine {
  constructor() {
    super('Baidu');
  }

  async search(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
    const { maxResults = 10 } = options;

    try {
      const url = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}&rn=${maxResults}`;
      const html = await this.httpClient.get(url, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        },
      });

      const $ = cheerio.load(html);
      const results: SearchResult[] = [];

      // Baidu organic search results
      $('.result, .c-container').each((_, element) => {
        if (results.length >= maxResults) return false;

        const $result = $(element);
        const $title = $result.find('h3 a, .t a');
        const $snippet = $result.find('.c-abstract, .c-span18');

        const title = this.cleanText($title.text());
        let url = $title.attr('href');
        const snippet = this.cleanText($snippet.text());

        // Baidu uses redirect URLs, try to get the real URL
        if (url && url.startsWith('/link?url=')) {
          // For simplicity, we'll keep the Baidu URL
          // In production, you might want to resolve the redirect
          url = `https://www.baidu.com${url}`;
        }

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
      throw new Error(`Baidu search failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}
