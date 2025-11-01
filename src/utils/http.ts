import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface HttpClientOptions {
  proxy?: string;
  timeout?: number;
  userAgent?: string;
}

export class HttpClient {
  private client: AxiosInstance;

  constructor(options: HttpClientOptions = {}) {
    const {
      proxy = process.env.https_proxy || process.env.HTTPS_PROXY || 'http://localhost:1081',
      timeout = 30000,
      userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    } = options;

    const config: AxiosRequestConfig = {
      timeout,
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      },
    };

    // Configure proxy if provided
    if (proxy) {
      const proxyUrl = new URL(proxy);
      config.proxy = {
        host: proxyUrl.hostname,
        port: parseInt(proxyUrl.port || '80'),
        protocol: proxyUrl.protocol.replace(':', ''),
      };
    }

    this.client = axios.create(config);
  }

  async get(url: string, config?: AxiosRequestConfig): Promise<string> {
    try {
      const response = await this.client.get(url, {
        ...config,
        responseType: 'text',
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP request failed: ${error.message}`);
      }
      throw error;
    }
  }

  async post(url: string, data?: any, config?: AxiosRequestConfig): Promise<string> {
    try {
      const response = await this.client.post(url, data, {
        ...config,
        responseType: 'text',
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP request failed: ${error.message}`);
      }
      throw error;
    }
  }
}
