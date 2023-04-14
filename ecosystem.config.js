module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/server/entry.mjs',
      env: {
        'SERVER_KEY_PATH': './private/simpletalkai.com.key',
        'SERVER_CERT_PATH': './private/simpletalkai.com.pem',
      },
    },
  ],
}
