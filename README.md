# Search MCP Server

一个基于 Model Context Protocol (MCP) 的网络搜索服务器，支持多个搜索引擎并具有自动降级功能。

## ✨ 功能特性

- 🔍 **多搜索引擎支持**
  - SerpAPI (推荐 - 需要API密钥)
  - Baidu (百度)
  - Google
  - DuckDuckGo
  - SearXNG
- 🔄 自动降级机制
- 🌐 代理支持 (自动使用 `http://localhost:1081`)
- 📦 完全兼容 MCP 协议
- 🎯 结构化搜索结果 (标题、链接、摘要)

## 📦 安装

```bash
npm install
npm run build
```

## 🚀 使用方法

### 方案一：使用 SerpAPI（推荐）

**为什么推荐 SerpAPI？**
- ✅ 稳定可靠，无反爬虫问题
- ✅ 免费层：100次搜索/月
- ✅ 支持多个搜索引擎（Google、Bing、百度等）
- ✅ 官方API，速度快

**获取 API 密钥：**
1. 访问 https://serpapi.com/
2. 注册免费账户
3. 获取 API Key

**配置：**
```bash
# 方式1: 使用 .env.local 文件（推荐）
cp .env.example .env.local
# 编辑 .env.local，填入你的 API Key
# SERPAPI_KEY=your_api_key_here

# 方式2: 使用环境变量
export SERPAPI_KEY="your_api_key_here"
```

**测试搜索：**
```bash
# 编译项目
npm run build

# 运行测试（会自动读取 .env.local）
npm run dev
# 或
npx tsx src/test.ts
```

### 方案二：使用开源引擎（可能遇到反爬虫）

直接使用代码中实现的爬虫引擎，可能会遇到：
- 503 错误
- 验证码拦截
- 超时问题

## 🔧 Claude Code 配置

配置 `.env.local` 后，在 Claude Code 配置文件中添加 MCP 服务器：

**推荐配置（使用 .env.local）：**
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

**或者在配置中指定环境变量：**
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

> **提示：** 推荐使用 `.env.local` 文件管理密钥，更安全且便于管理。

## 🛠️ 开发

```bash
# 开发模式运行
npm run dev

# 编译
npm run build

# 运行编译后的版本
npm start
```

## 📖 搜索工具 API

MCP 服务器提供 `web_search` 工具，参数如下：

- `query` (必需): 搜索查询字符串
- `engine` (可选): 要使用的搜索引擎
  - `auto` (默认): 自动尝试所有引擎并降级
  - `serpapi`: 使用 SerpAPI (需要 SERPAPI_KEY)
  - `baidu`: 仅使用百度
  - `google`: 仅使用 Google
  - `duckduckgo`: 仅使用 DuckDuckGo
  - `searxng`: 仅使用 SearXNG
- `max_results` (可选): 最大结果数 (1-50, 默认: 10)
- `language` (可选): 语言偏好 (默认: "en")

## 💡 使用示例

在 Claude Code 中调用：

```typescript
web_search({
  query: "今天黄金价格",
  engine: "auto",
  max_results: 5
})
```

## 🌍 环境变量

- `https_proxy` / `HTTPS_PROXY`: 代理服务器 URL (默认: http://localhost:1081)
- `SERPAPI_KEY`: SerpAPI 密钥 (可选，但强烈推荐)

## 📂 项目结构

```
search-mcp/
├── src/
│   ├── index.ts              # MCP 服务器入口
│   ├── search/
│   │   ├── base.ts           # 搜索引擎基类
│   │   ├── serpapi.ts        # SerpAPI 实现 (推荐)
│   │   ├── baidu.ts          # 百度搜索
│   │   ├── google.ts         # Google 搜索
│   │   ├── duckduckgo.ts     # DuckDuckGo 搜索
│   │   ├── searxng.ts        # SearXNG 搜索
│   │   └── manager.ts        # 搜索管理器 (降级逻辑)
│   └── utils/
│       └── http.ts           # HTTP 客户端 (代理支持)
├── package.json
├── tsconfig.json
├── PLAN.md                    # 开发计划
├── SOLUTION.md                # 问题解决方案
└── README.md                  # 本文件
```

## ⚠️ 反爬虫问题说明

由于主流搜索引擎（Google、Baidu、DuckDuckGo）都有严格的反爬虫措施，直接爬取可能遇到：
- 503 Service Unavailable
- 验证码拦截
- IP 封禁
- 请求超时

**强烈建议使用 SerpAPI**，它提供官方 API 接口，无需担心反爬虫问题。

查看 `SOLUTION.md` 获取更多替代方案。

## 📝 许可证

ISC
