# Search MCP Server - 使用说明

## ⚠️ 重要说明

由于主流搜索引擎（Google、Baidu、DuckDuckGo等）都有严格的反爬虫措施，直接爬取搜索结果会遇到以下问题：
- 503 Service Unavailable 错误
- 验证码拦截
- IP封禁
- 超时

## 建议的解决方案

### 方案 1: 使用搜索 API（推荐）

集成官方API服务，虽然需要API密钥，但稳定可靠：

1. **SerpAPI** (https://serpapi.com/)
   - 支持 Google, Bing, Baidu 等多个搜索引擎
   - 免费层：100次/月
   - 简单易用

2. **Bing Web Search API** (Microsoft Azure)
   - 官方 API，稳定可靠
   - 免费层：1000次/月

3. **Google Custom Search API**
   - Google 官方 API
   - 免费层：100次/天

### 方案 2: 使用 SearXNG 私有实例

部署自己的 SearXNG 实例（开源元搜索引擎）：

```bash
docker run -d -p 8888:8080 searxng/searxng
```

然后修改配置使用本地实例：`http://localhost:8888`

### 方案 3: 使用浏览器自动化

使用 Puppeteer 或 Playwright 模拟真实浏览器行为，可以绕过大部分反爬虫：

```bash
npm install puppeteer
```

## 当前实现

当前代码已实现以下搜索引擎的基础爬取功能：
- ✅ Baidu
- ✅ Google
- ✅ DuckDuckGo
- ✅ SearXNG

但由于反爬虫限制，实际使用中可能会失败。

## 如何启用 API 集成

### 使用 SerpAPI 示例

```bash
# 安装依赖
npm install serpapi

# 设置环境变量
export SERPAPI_KEY="your_api_key_here"
```

我可以帮你集成 SerpAPI 或其他 API 服务，只需提供 API 密钥即可。

## MCP 服务器配置

当解决了搜索引擎访问问题后，在 Claude Code 配置中添加：

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

## 下一步

你希望我：
1. 集成 SerpAPI（需要API密钥）
2. 部署 SearXNG 私有实例
3. 添加 Puppeteer 浏览器自动化
4. 其他方案？

请告诉我你的选择！
