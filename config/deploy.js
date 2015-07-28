module.exports = {
  development: {
    buildEnv: 'development', // Override the environment passed to the ember asset build. Defaults to 'production'
    apiBaseURL: '',
    store: {
      type: 'redis', // the default store is 'redis'
      host: '192.168.59.103', // change to localhost on linux / find this on OSX using boot2docker ip
      port: 6379
    },
    assets: {
      accessKeyId: 'AKIAJVMZYC2JCT2XY53Q',
      secretAccessKey: process.env['AWS_ACCESS_KEY'],
      bucket: 'repositive.io'
    }
  },
  testing: {
    buildEnv: 'testing', // Override the environment passed to the ember asset build. Defaults to 'production'
    apiBaseURL: 'http://testing.api.repositive.io',
    store: {
      host: 'testing.discover.repositive.io',
      port: 6379,
    },
    assets: {
      accessKeyId: process.env['AWS_KEY_ID'],
      secretAccessKey: process.env['AWS_ACCESS_KEY'],
      bucket: 'testing.discover.repositive.io',
      //region: 'eu-central-1'
    }
  },
  production: {
    buildEnv: 'production', // Override the environment passed to the ember asset build. Defaults to 'production'
    apiBaseURL: 'http://api.repositive.io',
    store: {
      host: 'discover.repositive.io',
      port: 6379,
      //password: '<your-redis-secret>' // do not use passwd tunnel over ssh instead
    },
    assets: {
      accessKeyId: process.env['AWS_KEY_ID'],
      secretAccessKey: process.env['AWS_ACCESS_KEY'],
      bucket: 'discover.repositive.io',
     // region: 'eu-central-1',
    }
  }
};
