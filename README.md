

# new-label-website

## 技术栈
Vue3 + Vite + TailwindCSS + Pinia

## 项目结构概览
- 静态资源：`public/` 目录下包含背景图片和网站图标
- 核心代码：`src/` 目录包含 Vue 组件、样式文件和状态管理模块
- 配置文件：包含 Vite、TailwindCSS、PostCSS 等开发配置

## 推荐开发环境设置
建议使用 Visual Studio Code 配合以下插件：
- Vue Language Features (Volar)
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- GitLens

## 项目初始化配置
项目包含完整的前端配置文件，可直接通过 Vite 启动开发服务器。TailwindCSS 提供现代化的 CSS 实用程序。

## 项目启动步骤
### 安装依赖
```bash
npm install
```

### 开发环境启动
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码格式化
```bash
npm run format
```

### 代码检查
```bash
npm run lint
```

## 项目结构说明
- `src/App.vue`：应用主组件
- `src/main.js`：应用入口文件，使用 Pinia 状态管理
- `src/assets/`：包含多个 CSS 文件，实现主题样式和全局样式设置
- `src/components/`：组件目录，包含头部、导航、主内容、搜索、菜单、日期桌面等多个功能组件
- `src/stores/`：Pinia 状态管理模块，涵盖主题切换、背景图片管理、对话框显示控制等功能

## 特性说明
- 支持深色/浅色主题切换
- 提供详细的导航管理功能
- 包含设置和配置对话框组件
- 使用现代化 CSS 技术（包含滚动条自定义样式）
- 响应式布局设计

## 贡献指南
请遵循以下步骤：
1. Fork 项目
2. 创建新分支
3. 提交你的修改
4. 创建 Pull Request

请确保代码风格与现有代码保持一致，并正确使用 TailwindCSS 的类命名规范。