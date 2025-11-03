# new-label-website

## 技术栈
Vue3 + Vite + TailwindCSS + Pinia + Express

## 项目结构

### 文件树状图
```
new-label-website/
├── public/                          # 静态资源目录
│   ├── backgroundImages/             # 背景图片资源
│   │   ├── bg-1.png ~ bg-9.png     # 预设背景图片
│   │   └── 用户须知.png
│   └── favicon.ico                  # 网站图标
│
├── src/                              # 源代码目录
│   ├── assets/                       # 样式资源
│   │   ├── base.css                 # 基础样式
│   │   ├── main.css                 # 主样式
│   │   ├── pop.css                  # 弹窗样式
│   │   ├── theme.css                # 主题样式
│   │   └── logo.svg                 # Logo
│   │
│   ├── components/                   # Vue组件
│   │   ├── dialogParts/             # 对话框组件
│   │   │   ├── navigationDetails.vue    # 导航详情
│   │   │   ├── navigationManagement.vue # 导航管理
│   │   │   └── settings.vue             # 设置对话框
│   │   ├── iconComponents/          # 图标组件
│   │   │   └── dialogIcon.vue
│   │   ├── mainParts/               # 主内容组件
│   │   │   ├── dateDesk.vue         # 日期桌面
│   │   │   ├── deskNavPancel.vue    # 桌面导航面板
│   │   │   ├── menuPart.vue         # 菜单组件
│   │   │   └── searchPart.vue       # 搜索组件
│   │   ├── footerPart.vue           # 底部组件
│   │   ├── headerPart.vue           # 头部组件（包含天气）
│   │   └── mainPart.vue             # 主组件
│   │
│   ├── stores/                       # Pinia状态管理
│   │   ├── backgroundImage.js       # 背景图片管理
│   │   ├── isFirst.js               # 首次访问状态
│   │   ├── isShowDialogs.js         # 对话框显示控制
│   │   ├── layoutElement.js         # 布局元素控制
│   │   ├── menuLayout.js            # 菜单布局
│   │   ├── navigationBar.js         # 导航栏状态
│   │   ├── searchPart.js            # 搜索组件状态
│   │   ├── settingopt.js            # 设置选项（包含天气城市）
│   │   └── themeSwap.js             # 主题切换
│   │
│   ├── config/                       # 配置文件
│   │   └── appConfig.js             # 应用配置
│   │
│   ├── App.vue                       # 根组件
│   └── main.js                       # 应用入口
│
├── dist/                             # 构建输出目录（构建后生成）
│
├── server.js                         # Express后端服务器
├── .env                              # 环境变量配置（需要创建）
├── index.html                        # HTML入口文件
├── package.json                      # 项目依赖配置
├── vite.config.js                   # Vite配置
├── tailwind.config.js               # TailwindCSS配置
├── postcss.config.js                # PostCSS配置
├── jsconfig.json                     # JS配置
└── README.md                         # 项目说明文档
```

## 环境要求
- Node.js >= 16.0.0
- pnpm >= 7.0.0 (推荐) 或 npm >= 8.0.0

## 安装依赖

### 使用 pnpm (推荐)
```bash
pnpm install
```

### 使用 npm
```bash
npm install
```

## 环境变量配置

在项目根目录创建 `.env` 文件，配置以下环境变量：

```env
# 心知天气API密钥（必填）
XINZHI_WEATHER_API_KEY=your_api_key_here

# 服务器端口（可选，默认3000）
PORT=3000

# 应用名称前缀（可选）
VITE_APP_NAME_PREFIX=桑桑
```

> **注意**：`.env` 文件已被 `.gitignore` 忽略，不会提交到版本库。请参考 `.env copy` 文件创建你自己的 `.env` 文件。

## 开发模式

### 方式一：前后端分离开发（推荐）

**启动后端服务器：**
```bash
# 使用 pnpm
pnpm run server

# 或使用 npm
npm run server
```
后端服务将在 `http://localhost:3000` 启动

**启动前端开发服务器：**
```bash
# 使用 pnpm
pnpm run dev

# 或使用 npm
npm run dev
```
前端开发服务器将在 `http://localhost:5173` 启动（Vite默认端口）

前端会通过代理将 `/api` 请求转发到后端服务器 `http://localhost:3000`

### 方式二：同时启动前后端

使用 `concurrently` 同时启动前后端：

```bash
# 使用 pnpm
pnpm run dev:all

# 或使用 npm
npm run dev:all
```

这将同时启动后端服务器和前端开发服务器。

## 生产环境构建与部署

### 前后端一体化部署

项目支持前后端一体化部署，后端服务器会同时提供：
1. API接口服务
2. 静态文件服务（前端构建后的文件）

**构建并启动（一键部署）：**
```bash
# 使用 pnpm
pnpm run build:start

# 或使用 npm
npm run build:start
```

这个命令会：
1. 执行 `vite build` 构建前端代码到 `dist/` 目录
2. 执行 `node server.js` 启动后端服务器

**分步执行：**
```bash
# 1. 构建前端
pnpm run build

# 2. 启动后端服务器（会同时提供静态文件服务）
pnpm run start
```

访问 `http://localhost:3000` 即可使用完整的应用。

### 仅预览构建结果

构建完成后，可以使用 Vite 预览：

```bash
pnpm run preview
```

> **注意**：预览模式不会包含后端API功能，仅用于查看前端构建效果。

## 后端API接口

### 获取网站图标
```
GET /api/getIcon?website=<网站URL>
```
示例：`/api/getIcon?website=example.com`

### 获取天气信息
```
GET /api/weather?location=<位置>
```
位置参数可以是：
- 城市名：如 `beijing`、`shanghai`
- 经纬度：格式为 `纬度:经度`，如 `39.9042:116.4074`

示例：
- `/api/weather?location=beijing`
- `/api/weather?location=广东中山`
- `/api/weather?location=39.9042:116.4074`

### 健康检查
```
GET /health
```

## 项目启动步骤总结

### 首次运行
1. **安装依赖**
   ```bash
   pnpm install
   ```

2. **配置环境变量**
   - 复制 `.env copy` 文件为 `.env`
   - 填写你的 `XINZHI_WEATHER_API_KEY`

3. **开发模式启动**
   ```bash
   # 同时启动前后端
   pnpm run dev:all
   
   # 或分别启动
   pnpm run server    # 终端1
   pnpm run dev       # 终端2
   ```

4. **访问应用**
   - 前端开发服务器：http://localhost:5173
   - 后端API服务：http://localhost:3000

### 生产部署
1. **构建并启动**
   ```bash
   pnpm run build:start
   ```

2. **访问应用**
   - 完整应用：http://localhost:3000

## 推荐开发环境设置
建议使用 Visual Studio Code 配合以下插件：
- Vue Language Features (Volar)
- Tailwind CSS IntelliSense
- Prettier - Code formatter
- GitLens

## 项目结构说明

### 核心文件
- `src/App.vue`：应用主组件
- `src/main.js`：应用入口文件，使用 Pinia 状态管理
- `server.js`：Express 后端服务器，提供API和静态文件服务

### 样式资源
- `src/assets/base.css`：基础样式
- `src/assets/main.css`：主样式
- `src/assets/pop.css`：弹窗样式
- `src/assets/theme.css`：主题样式

### 组件目录
- `src/components/`：包含头部、导航、主内容、搜索、菜单、日期桌面等多个功能组件
- `src/components/headerPart.vue`：头部组件，包含天气显示功能
- `src/components/dialogParts/`：对话框组件，包含设置、导航管理等

### 状态管理
- `src/stores/`：Pinia 状态管理模块
  - `themeSwap.js`：主题切换
  - `settingopt.js`：设置选项（包含天气城市配置）
  - `backgroundImage.js`：背景图片管理
  - `navigationBar.js`：导航栏状态管理
  - 其他功能模块...

## 特性说明
- ✅ 支持深色/浅色主题切换
- ✅ 提供详细的导航管理功能
- ✅ 包含设置和配置对话框组件
- ✅ 天气功能（支持自定义城市）
- ✅ 网站图标自动获取功能
- ✅ 使用现代化 CSS 技术（包含滚动条自定义样式）
- ✅ 响应式布局设计
- ✅ 前后端一体化部署支持

## 开发脚本说明

| 命令 | 说明 |
|------|------|
| `pnpm run dev` | 启动前端开发服务器 |
| `pnpm run build` | 构建前端生产版本 |
| `pnpm run preview` | 预览构建结果 |
| `pnpm run server` | 启动后端服务器 |
| `pnpm run start` | 启动后端服务器（同server） |
| `pnpm run dev:all` | 同时启动前后端（开发模式） |
| `pnpm run build:start` | 构建并启动（生产模式） |

## 常见问题

### Q: 天气API返回403错误？
A: 请检查 `.env` 文件中的 `XINZHI_WEATHER_API_KEY` 是否正确配置，API密钥是否有效。

### Q: 前端无法访问后端API？
A: 
- 开发模式：确保后端服务器运行在 `http://localhost:3000`
- 检查 `vite.config.js` 中的代理配置是否正确
- 生产模式：确保使用 `build:start` 命令启动

### Q: 如何修改天气城市？
A: 打开设置对话框，在"天气城市"输入框中填写城市名（格式：省+市区，如：广东中山）。城市名会保存到 localStorage。

### Q: 构建后无法访问页面？
A: 确保使用 `pnpm run build:start` 或 `pnpm run start` 启动服务器，服务器会自动提供 `dist/` 目录下的静态文件。

## 贡献指南
请遵循以下步骤：
1. Fork 项目
2. 创建新分支
3. 提交你的修改
4. 创建 Pull Request

请确保代码风格与现有代码保持一致，并正确使用 TailwindCSS 的类命名规范。

## 许可证
ISC
