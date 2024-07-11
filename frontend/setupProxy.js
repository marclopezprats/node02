const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'http://localhost:5000', // El puerto en el que tu servidor proxy está corriendo
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '', // Reescribe la URL para que las solicitudes no incluyan "/proxy"
      },
    })
  );
};
