const process = require('node:process');
const path = require('path');
const { CONFIG } = require('./src/config/config');
const { startAdminServer } = require('./src/controllers/admin');

// Render 适配：优先取环境变量 PORT，兼容平台随机端口
const PORT = Number(process.env.PORT || CONFIG.adminPort || 3000);

// 静态文件路径：core/client.js → 根目录 web/dist
const WEB_DIST_PATH = path.join(__dirname, '../web/dist');

// 启动管理后台服务
startAdminServer(PORT, WEB_DIST_PATH);

// ===================== 原有业务逻辑保留区 =====================
// 下方保留你原有的 Bot 进程管理、定时任务、WS 连接等全部代码
// 原代码直接粘贴在此处即可，无需修改
// ============================================================

// Render 适配：进程异常捕获，防止意外退出
process.on('uncaughtException', (err) => {
    console.error('[进程异常]', err.message);
    console.error(err.stack);
});

process.on('unhandledRejection', (reason) => {
    console.error('[未捕获Promise异常]', reason);
});

console.log(`[启动成功] 管理面板运行端口: ${PORT}`);
