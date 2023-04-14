const path = require('path')
module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/server/entry.mjs',
      env: {
        'SERVER_KEY_PATH': path.resolve(__dirname,
          './private/simpletalkai.com.key'),
        'SERVER_CERT_PATH': path.resolve(__dirname,
          './private/simpletalkai.com.pem'),
      },
    },
  ],
}
