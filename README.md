# Search MCP Server

A web search server based on Model Context Protocol (MCP) that supports multiple search engines with automatic fallback functionality.

## ✨ Features

- 🔍 **Multiple Search Engine Support**
  - SerpAPI (recommended - requires API key)
  - Baidu
  - Google
  - DuckDuckGo
  - SearXNG
- 🔄 Automatic fallback mechanism
- 🌐 Proxy support (automatically uses `http://localhost:1081`)
- 📦 Fully compatible with MCP protocol
- 🎯 Structured search results (title, link, snippet)

## 📦 Installation

```bash
npm install
npm run build
```

## 🚀 Usage

### Option 1: Use SerpAPI (Recommended)

**Why SerpAPI?**
- ✅ Stable and reliable, no anti-scraping issues
- ✅ Free tier: 100 searches/month
- ✅ Supports multiple search engines (Google, Bing, Baidu, etc.)
- ✅ Official API, fast response

**Get API Key:**
1. Visit https://serpapi.com/
2. Register for a free account
3. Get your API Key

**Configuration:**
```bash
# Method 1: Use .env.local file (recommended)
cp .env.example .env.local
# Edit .env.local, add your API Key
# SERPAPI_KEY=your_api_key_here

# Method 2: Use environment variable
export SERPAPI_KEY="your_api_key_here"
```

**Test Search:**
```bash
# Build the project
npm run build

# Run test (automatically reads .env.local)
npm run dev
# or
npx tsx src/test.ts
```

### Option 2: Use Open Source Engines (May Encounter Anti-Scraping)

Directly use the scraper engines implemented in the code, but may encounter:
- 503 errors
- CAPTCHA blocking
- Timeout issues

## 🔧 Claude Code Configuration

After configuring `.env.local`, add MCP server to Claude Code configuration:

**Recommended Configuration (using .env.local):**
```json
{
  "mcpServers": {
    "search": {
      "command": "node",
      "args": ["/home/ubuntu/work/search-mcp/dist/index.js"]
    }
  }
}
```

**Or specify environment variables in config:**
```json
{
  "mcpServers": {
    "search": {
      "command": "node",
      "args": ["/home/ubuntu/work/search-mcp/dist/index.js"],
      "env": {
        "SERPAPI_KEY": "your_serpapi_key_here"
      }
    }
  }
}
```

> **Tip:** Using `.env.local` file for key management is more secure and convenient.

## 🛠️ Development

```bash
# Development mode
npm run dev

# Build
npm run build

# Run built version
npm start
```

## 📖 Search Tool API

The MCP server provides a `web_search` tool with the following parameters:

- `query` (required): Search query string
- `engine` (optional): Search engine to use
  - `auto` (default): Automatically try all engines with fallback
  - `serpapi`: Use SerpAPI (requires SERPAPI_KEY)
  - `baidu`: Use Baidu only
  - `google`: Use Google only
  - `duckduckgo`: Use DuckDuckGo only
  - `searxng`: Use SearXNG only
- `max_results` (optional): Maximum number of results (1-50, default: 10)
- `language` (optional): Language preference (default: "en")

## 💡 Usage Examples

Call in Claude Code:

```typescript
web_search({
  query: "gold price today",
  engine: "auto",
  max_results: 5
})
```

## 🌍 Environment Variables

- `https_proxy` / `HTTPS_PROXY`: Proxy server URL (default: http://localhost:1081)
- `SERPAPI_KEY`: SerpAPI key (optional but highly recommended)

## 📂 Project Structure

```
search-mcp/
├── src/
│   ├── index.ts              # MCP server entry point
│   ├── search/
│   │   ├── base.ts           # Search engine base class
│   │   ├── serpapi.ts        # SerpAPI implementation (recommended)
│   │   ├── baidu.ts          # Baidu search
│   │   ├── google.ts         # Google search
│   │   ├── duckduckgo.ts     # DuckDuckGo search
│   │   ├── searxng.ts        # SearXNG search
│   │   └── manager.ts        # Search manager (fallback logic)
│   └── utils/
│       └── http.ts           # HTTP client (proxy support)
├── package.json
├── tsconfig.json
├── PLAN.md                    # Development plan
├── SOLUTION.md                # Problem solutions
└── README.md                  # This file
```

## ⚠️ Anti-Scraping Issues

Due to strict anti-scraping measures by major search engines (Google, Baidu, DuckDuckGo), direct scraping may encounter:
- 503 Service Unavailable
- CAPTCHA blocking
- IP bans
- Request timeouts

**Strongly recommend using SerpAPI**, which provides official API access without anti-scraping concerns.

See `SOLUTION.md` for alternative solutions.

## 📝 License

ISC
