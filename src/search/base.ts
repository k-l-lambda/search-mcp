import { HttpClient } from '../utils/http.js';

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  engine?: string;
}

export interface SearchOptions {
  maxResults?: number;
  language?: string;
  region?: string;
}

export abstract class SearchEngine {
  protected httpClient: HttpClient;
  protected name: string;

  constructor(name: string) {
    this.name = name;
    this.httpClient = new HttpClient();
  }

  abstract search(query: string, options?: SearchOptions): Promise<SearchResult[]>;

  protected cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();
  }

  protected validateResults(results: SearchResult[]): SearchResult[] {
    return results.filter(result =>
      result.title &&
      result.url &&
      result.url.startsWith('http')
    );
  }
}
