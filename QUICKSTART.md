# Search MCP - 快速开始

## 🚀 5分钟快速上手

### 1. 选择方案

#### 方案 A：使用 SerpAPI（推荐，最稳定）

1. **注册 SerpAPI**
   - 访问：https://serpapi.com/users/sign_up
   - 免费注册账户
   - 获取 API Key（免费100次/月）

2. **配置 API Key**
   ```bash
   # 创建 .env.local 文件
   cd /home/ubuntu/work/search-mcp
   cp .env.example .env.local

   # 编辑 .env.local，填入你的 API Key
   # SERPAPI_KEY=你的API密钥
   ```

   或者直接创建文件：
   ```bash
   echo "SERPAPI_KEY=你的API密钥" > .env.local
   ```

3. **配置 Claude Code**

   编辑配置文件（具体路径取决于你的系统）：
   - macOS/Linux: `~/.config/claude/config.json`
   - Windows: `%APPDATA%\claude\config.json`

   添加以下内容：
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

   > **提示：** API Key 已保存在 `.env.local` 中，无需在配置中重复指定！

4. **重启 Claude Code**

5. **测试搜索**
   在 Claude Code 中输入：
   ```
   帮我搜索一下今天的黄金价格
   ```

#### 方案 B：不使用 API（免费但不稳定）

1. **配置 Claude Code**
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

2. **注意事项**
   - 可能遇到反爬虫限制
   - 成功率较低
   - 不推荐用于生产环境

## 📋 检查清单

- [ ] 项目已编译（`npm run build`）
- [ ] SerpAPI Key 已获取（方案A）
- [ ] Claude Code 配置已更新
- [ ] 代理服务器运行正常（http://localhost:1081）
- [ ] Claude Code 已重启
- [ ] 测试搜索功能

## 🧪 测试命令

### 测试 1: 基础搜索
```
搜索今天的天气
```

### 测试 2: 中文搜索
```
搜索黄金价格最新消息
```

### 测试 3: 英文搜索
```
Search for latest AI news
```

### 测试 4: 指定引擎
```
使用 serpapi 搜索 bitcoin price
```

## ❓ 常见问题

### Q: 搜索失败怎么办？
A:
1. 检查 SerpAPI Key 是否正确
2. 确认代理服务器是否运行
3. 查看 Claude Code 日志
4. 尝试重启 Claude Code

### Q: 免费额度用完了怎么办？
A:
1. SerpAPI 免费层：100次/月
2. 可以注册新账户
3. 或升级到付费计划
4. 或使用其他搜索引擎（不稳定）

### Q: 如何查看详细日志？
A: MCP 服务器的错误会输出到 Claude Code 的错误流，可以在 Claude Code 中查看。

### Q: 支持哪些搜索引擎？
A:
- SerpAPI (推荐)
- Google (不稳定)
- Baidu (不稳定)
- DuckDuckGo (不稳定)
- SearXNG (不稳定)

## 📞 获取帮助

如果遇到问题：
1. 查看 `README.md` 详细文档
2. 查看 `SOLUTION.md` 解决方案
3. 查看 `SUMMARY.md` 项目总结

## 🎉 成功示例

当配置成功后，你可以：

```
用户：搜索今天黄金价格

Claude：我来帮你搜索今天的黄金价格。

[调用 web_search 工具]

根据搜索结果，今天的黄金价格是...
```

祝你使用愉快！🎊
