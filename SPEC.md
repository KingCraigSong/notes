# Obsidian Vault Viewer - Product Requirement Document

## Overview
- **Summary**: 基于Quartz 5的Obsidian Vault静态网站生成器，能够读取Obsidian笔记并在网页上渲染，支持目录生成、标签浏览、全文搜索等功能。
- **Purpose**: 让用户能够将Obsidian笔记发布到GitHub Pages上，无需额外服务器资源即可在线浏览。
- **Target Users**: Obsidian用户、知识管理爱好者、开发者

## Goals
- ✅ 能够读取Obsidian Vault中的Markdown文件
- ✅ 在网页上渲染Markdown内容，支持Obsidian特有的语法
- ✅ 自动生成笔记目录导航
- ✅ 支持标签分类浏览
- ✅ 支持全文搜索功能
- ✅ 支持GitHub Pages自动部署

## Non-Goals (Out of Scope)
- 不支持笔记编辑功能（只读查看）
- 不支持实时同步
- 不支持Obsidian插件

## Functional Requirements
- ✅ **FR-1**: 解析Obsidian Vault目录结构（Explorer组件）
- ✅ **FR-2**: 渲染Markdown笔记内容（支持Obsidian语法）
- ✅ **FR-3**: 自动生成目录导航树（TableOfContents组件）
- ✅ **FR-4**: 支持标签筛选和浏览（TagPage、TagList组件）
- ✅ **FR-5**: 支持笔记搜索功能（Search组件）
- ✅ **FR-6**: 支持GitHub Pages部署（GitHub Actions工作流）

## Non-Functional Requirements
- ✅ **NFR-1**: 响应式设计，支持移动端浏览
- ✅ **NFR-2**: 加载速度快，纯静态页面
- ✅ **NFR-3**: 支持深色/浅色主题切换（Darkmode组件）
- ✅ **NFR-4**: 无需后端，纯静态页面

## Constraints
- **Technical**: Quartz 5框架，Preact前端，无后端依赖
- **Business**: 免费托管在GitHub Pages，无额外成本
- **Dependencies**: 需要Obsidian Vault作为数据源

## Assumptions
- 用户已拥有Obsidian Vault，并希望将其发布到Web
- 用户熟悉Git和GitHub操作
- Vault中的笔记以Markdown格式存储

## Acceptance Criteria

### AC-1: Vault目录解析 ✅
- **Given**: Obsidian Vault目录包含多个Markdown文件和子目录
- **When**: 应用启动时
- **Then**: 正确解析目录结构并构建文件树
- **Verification**: `programmatic` - Explorer组件自动显示目录树

### AC-2: Markdown渲染 ✅
- **Given**: 一个包含Obsidian语法的Markdown文件
- **When**: 用户点击该笔记
- **Then**: 正确渲染Markdown内容，支持加粗、斜体、列表、代码块等
- **Verification**: `human-judgment`

### AC-3: 目录导航生成 ✅
- **Given**: Vault中有多个笔记文件
- **When**: 用户打开应用
- **Then**: 侧边栏显示完整的目录树，支持展开/折叠
- **Verification**: `human-judgment` - Explorer组件支持展开/折叠

### AC-4: 标签支持 ✅
- **Given**: 笔记中包含Obsidian标签（如#tag）
- **When**: 用户查看笔记或浏览标签页面
- **Then**: 标签正确显示并可点击筛选
- **Verification**: `programmatic` - TagList和TagPage组件

### AC-5: 搜索功能 ✅
- **Given**: 用户在搜索框输入关键词
- **When**: 用户按下回车键或点击搜索按钮
- **Then**: 显示匹配的笔记列表
- **Verification**: `programmatic` - Search组件

### AC-6: GitHub Pages部署 ✅
- **Given**: 用户将代码推送到GitHub仓库
- **When**: 配置GitHub Actions工作流
- **Then**: 自动构建并部署到GitHub Pages
- **Verification**: `programmatic` - deploy.yml工作流