module.exports = {
    devServer: {
        proxy: {
            '^/system/*': {
                target: 'http://localhost:3000',
                changeOrigin: true
                // pathRewrite: {}
            },
            '^/medicine/*': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            '^/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '^/ipAndCity': {
                target: 'http://whois.pconline.com.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/ipAndCity': '/ip.jsp'
                }
            }
        }
    }
}