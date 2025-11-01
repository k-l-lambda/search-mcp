# Search MCP Server - Usage Guide

## ⚠️ Important Notice

Due to strict anti-scraping measures by major search engines (Google, Baidu, DuckDuckGo, etc.), direct scraping of search results may encounter the following issues:
- 503 Service Unavailable errors
- CAPTCHA blocking
- IP bans
- Timeouts

## Recommended Solutions

### Solution 1: Use Search APIs (Recommended)

Integrate official API services. While API keys are required, they are stable and reliable:

1. **SerpAPI** (https://serpapi.com/)
   - Supports multiple search engines including Google, Bing, Baidu
   - Free tier: 100 searches/month
   - Simple and easy to use

2. **Bing Web Search API** (Microsoft Azure)
   - Official API, stable and reliable
   - Free tier: 1000 searches/month

3. **Google Custom Search API**
   - Official Google API
   - Free tier: 100 searches/day

### Solution 2: Use Private SearXNG Instance

Deploy your own SearXNG instance (open-source meta search engine):

```bash
docker run -d -p 8888:8080 searxng/searxng
```

Then modify configuration to use local instance: `http://localhost:8888`

### Solution 3: Use Browser Automation

Use Puppeteer or Playwright to simulate real browser behavior, which can bypass most anti-scraping measures:

```bash
npm install puppeteer
```

## Current Implementation

The current code implements basic scraping functionality for the following search engines:
- ✅ Baidu
- ✅ Google
- ✅ DuckDuckGo
- ✅ SearXNG

However, due to anti-scraping restrictions, they may fail in actual use.

## How to Enable API Integration

### SerpAPI Integration Example

```bash
# Install dependencies
npm install serpapi

# Set environment variable
export SERPAPI_KEY="your_api_key_here"
```

I can help you integrate SerpAPI or other API services - just provide the API key.

## MCP Server Configuration

After resolving search engine access issues, add to Claude Code configuration:

```json
{
  "mcpServers": {
    "search": {
      "command": "node",
      "args": ["/home/ubuntu/work/search-mcp/dist/index.js"],
      "env": {
        "https_proxy": "http://localhost:1081",
        "SERPAPI_KEY": "your_key_here"
      }
    }
  }
}
```

## Next Steps

Would you like me to:
1. Integrate SerpAPI (requires API key)
2. Deploy private SearXNG instance
3. Add Puppeteer browser automation
4. Other solutions?

Please let me know your choice!
