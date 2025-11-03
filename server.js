import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors());

// 解析JSON请求体
app.use(express.json());

// 静态文件目录（dist文件夹）
const distPath = join(__dirname, 'dist');
const hasDist = existsSync(distPath);

/**
 * 获取网站图标的API接口
 * @param {string} website - 网站URL
 * @returns {string} - 图标URL
 */
app.get('/api/getIcon', async (req, res) => {
    try {
        const { website } = req.query;
        
        if (!website) {
            return res.status(400).send('缺少website参数');
        }

        // 确保URL格式正确
        let url = website.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }

        // 解析域名
        let domain;
        let hostname;
        try {
            const urlObj = new URL(url);
            domain = urlObj.origin;
            hostname = urlObj.hostname;
        } catch (e) {
            return res.status(400).send('无效的URL格式');
        }

        // 优先尝试直接从网站根目录获取favicon
        const directIconUrls = [
            `${domain}/favicon.ico`,
            `${domain}/favicon.png`,
        ];

        // 尝试直接获取图标（快速检查）
        for (const iconUrl of directIconUrls) {
            try {
                const response = await axios.head(iconUrl, {
                    timeout: 3000,
                    validateStatus: (status) => status < 500,
                });

                if (response.status === 200) {
                    const contentType = response.headers['content-type'];
                    if (contentType && contentType.startsWith('image/')) {
                        return res.status(200).send(iconUrl);
                    }
                }
            } catch (e) {
                // 继续尝试下一个URL
                continue;
            }
        }

        // 如果直接获取失败，使用Google的favicon服务（最可靠的后备方案）
        const fallbackUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
        return res.status(200).send(fallbackUrl);

    } catch (error) {
        console.error('获取图标时出错:', error);
        // 返回默认的Google favicon服务
        try {
            const url = req.query.website || 'example.com';
            const hostname = url.replace(/^https?:\/\//, '').split('/')[0];
            const fallbackUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
            return res.status(200).send(fallbackUrl);
        } catch (e) {
            return res.status(500).send('获取图标失败');
        }
    }
});

// 健康检查接口
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: '后端服务运行正常' });
});

// 提供静态文件服务（API路由已在上面定义，不会被影响）
if (hasDist) {
    // 静态文件服务（CSS、JS、图片等）
    app.use(express.static(distPath));
    
    // SPA路由处理：所有非API和非静态文件的请求都返回index.html
    // 这样前端路由（Vue Router）可以正常工作
    app.get('*', (req, res, next) => {
        // API路由已在上面定义，不会被这里捕获
        // 返回index.html以支持前端路由
        res.sendFile(join(distPath, 'index.html'), (err) => {
            if (err) {
                res.status(404).send('页面未找到');
            }
        });
    });
} else {
    // 如果没有dist文件夹，为根路径提供提示信息
    app.get('/', (req, res) => {
        res.send(`
            <!DOCTYPE html>
            <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>构建提醒</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 40px; text-align: center; background: #f5f5f5; }
                        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                        code { background: #f0f0f0; padding: 2px 6px; border-radius: 3px; }
                        a { color: #007bff; text-decoration: none; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>网站尚未构建</h1>
                        <p>请先运行 <code>npm run build</code> 构建项目</p>
                        <p>API接口仍然可用: <a href="/api/getIcon?website=example.com">/api/getIcon?website=example.com</a></p>
                        <p style="margin-top: 30px; color: #666;">或者运行 <code>npm run build:start</code> 一键构建并启动</p>
                    </div>
                </body>
            </html>
        `);
    });
}

app.listen(PORT, () => {
    console.log(`后端服务器运行在 http://localhost:${PORT}`);
});

