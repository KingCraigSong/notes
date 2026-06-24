# Obsidian Vault Website - Quartz 5 Deployment

这是一个基于 **Quartz 5** 构建的 Obsidian 笔记网站，支持自动生成目录、标签浏览、全文搜索等功能。

## 功能特性

- **自动目录生成** - 侧边栏自动显示笔记目录结构
- **标签系统** - 支持 Obsidian 标签语法 (#tag)
- **全文搜索** - 快速搜索笔记内容
- **双向链接** - 支持 Obsidian 风格的 wikilinks
- **图形视图** - 可视化笔记之间的关联
- **深色模式** - 支持明暗主题切换
- **响应式设计** - 适配各种设备屏幕
- **GitHub Pages 部署** - 无需服务器，完全免费托管

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 安装社区插件

```bash
npm run install-plugins
```

### 3. 添加你的笔记

将你的 Obsidian 笔记放在 `content/` 目录中。

### 4. 本地预览

```bash
npm run quartz -- build
npx serve public
```

访问 http://localhost:3000 查看效果。

### 5. 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 推送代码到 main 分支
3. GitHub Actions 将自动构建和部署

## 配置说明

编辑 `quartz.config.yaml` 文件来自定义网站：

```yaml
configuration:
  pageTitle: 我的数字花园  # 网站标题
  locale: zh-CN           # 语言设置
  baseUrl: ""            # 部署域名（如: notes.example.com）
```

## 目录结构

```
.
├── content/              # 笔记内容目录（Markdown 文件）
│   ├── index.md         # 首页
│   ├── 技术笔记.md
│   └── ...
├── quartz.config.yaml   # Quartz 配置文件
├── public/              # 构建输出目录（自动生成）
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Actions 部署配置
```

## Obsidian 兼容性

Quartz 5 完全兼容 Obsidian 语法：

- **标签** - 使用 `#tag` 语法
- **双向链接** - 使用 `[[笔记名称]]` 语法
- **Callouts** - 支持 `> [!note]` 等语法
- **任务列表** - 支持 `- [x]` 语法
- **代码块** - 支持语法高亮
- **数学公式** - 支持 LaTeX 语法

## 部署到自定义域名

1. 在 `quartz.config.yaml` 中设置 `baseUrl`
2. 创建 `static/CNAME` 文件，写入你的域名
3. 配置你的域名 DNS 指向 GitHub Pages

## 技术栈

- **Quartz 5** - 静态网站生成器
- **Preact** - 前端框架
- **TypeScript** - 类型安全
- **GitHub Actions** - 自动部署

## 许可证

MIT License