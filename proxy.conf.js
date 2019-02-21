const PROXY_CONFIG = {
    "/api/*": {
        "target": "http://localhost:3000/api",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
}

module.exports = PROXY_CONFIG;