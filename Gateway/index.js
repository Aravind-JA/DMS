const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 5000;

app.use('/user', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/file', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));
app.use('/folder', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

app.listen(PORT, () => {
    console.log(`API Gateway listening at http://localhost:${PORT}`);
});
