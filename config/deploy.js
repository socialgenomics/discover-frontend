module.exports = {
  staging: {
    buildEnv: 'staging', // Override the environment passed to the ember asset build. Defaults to 'production'
    store: {
      host: 'staging-redis.example.com',
      port: 6379
    },
    assets: {
      accessKeyId: 'AKIAJVMZYC2JCT2XY53Q',
      secretAccessKey: process.env['AWS_ACCESS_KEY'],
      bucket: 'testing.repositive.io'
    }
  },
  production: {
    store: {
      host: 'production-redis.example.com',
      port: 6379,
      password: '<your-redis-secret>'
    },
    assets: {
      accessKeyId: 'AKIAJVMZYC2JCT2XY53Q',
      secretAccessKey: process.env['AWS_ACCESS_KEY'],
      bucket: 'repositive.io'
    }
  }
};
