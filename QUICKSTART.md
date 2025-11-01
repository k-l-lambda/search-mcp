# Search MCP - Quick Start Guide

## 🚀 5-Minute Quick Start

### 1. Choose Your Approach

#### Option A: Use SerpAPI (Recommended, Most Stable)

1. **Register for SerpAPI**
   - Visit: https://serpapi.com/users/sign_up
   - Create a free account
   - Get API Key (100 free searches/month)

2. **Configure API Key**
   ```bash
   # Create .env.local file
   cd /home/ubuntu/work/search-mcp
   cp .env.example .env.local

   # Edit .env.local, add your API Key
   # SERPAPI_KEY=your_api_key
   ```

   Or create the file directly:
   ```bash
   echo "SERPAPI_KEY=your_api_key" > .env.local
   ```

3. **Configure Claude Code**

   Edit configuration file (path depends on your system):
   - macOS/Linux: `~/.config/claude/config.json`
   - Windows: `%APPDATA%\claude\config.json`

   Add the following content:
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

   > **Tip:** API Key is saved in `.env.local`, no need to specify it in config!

4. **Restart Claude Code**

5. **Test Search**
   In Claude Code, type:
   ```
   Search for gold price today
   ```

#### Option B: Without API (Free but Unstable)

1. **Configure Claude Code**
   ```json
   {
     "mcpServers": {
       "search": {
         "command": "node",
         "args": ["/home/ubuntu/work/search-mcp/dist/index.js"],
         "env": {
           "https_proxy": "http://localhost:1081"
         }
       }
     }
   }
   ```

2. **Notes**
   - May encounter anti-scraping restrictions
   - Lower success rate
   - Not recommended for production use

## 📋 Checklist

- [ ] Project compiled (`npm run build`)
- [ ] SerpAPI Key obtained (Option A)
- [ ] Claude Code configuration updated
- [ ] Proxy server running (http://localhost:1081)
- [ ] Claude Code restarted
- [ ] Search functionality tested

## 🧪 Test Commands

### Test 1: Basic Search
```
Search for today's weather
```

### Test 2: Chinese Search
```
Search for latest gold price news
```

### Test 3: English Search
```
Search for latest AI news
```

### Test 4: Specify Engine
```
Use serpapi to search for bitcoin price
```

## ❓ FAQ

### Q: What if search fails?
A:
1. Check if SerpAPI Key is correct
2. Verify proxy server is running
3. Check Claude Code logs
4. Try restarting Claude Code

### Q: What if free quota is exhausted?
A:
1. SerpAPI free tier: 100 searches/month
2. Can register a new account
3. Or upgrade to paid plan
4. Or use other search engines (unstable)

### Q: How to view detailed logs?
A: MCP server errors output to Claude Code's error stream and can be viewed in Claude Code.

### Q: Which search engines are supported?
A:
- SerpAPI (recommended)
- Google (unstable)
- Baidu (unstable)
- DuckDuckGo (unstable)
- SearXNG (unstable)

## 📞 Get Help

If you encounter issues:
1. Check `README.md` for detailed documentation
2. Check `SOLUTION.md` for solutions
3. Check `SUMMARY.md` for project summary

## 🎉 Success Example

When configured successfully, you can:

```
User: Search for gold price today

Claude: Let me search for today's gold price.

[Calls web_search tool]

Based on the search results, today's gold price is...
```

Enjoy using the search tool! 🎊
