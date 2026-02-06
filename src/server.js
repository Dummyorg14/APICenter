const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const PORT = process.env.PORT || 8080;

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: "API Center is Online" });
});

// Routing Rules (In production, these targets come from Environment Variables)
// Example: If user visits /tribe1, forward to the Tribe 1 Backend
app.use('/tribe1', createProxyMiddleware({
    target: process.env.TRIBE1_URL || 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: { '^/tribe1': '' }
}));

// Only start the server if we are NOT testing (Jest handles the server itself)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 API Center running on port ${PORT}`);
    });
}

module.exports = app; // Export app for testing