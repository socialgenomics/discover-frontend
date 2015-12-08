/*jslint node: true */

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
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      bucket: 'repositive.io'
    }
  },
  testing: {
    buildEnv: 'testing', // Override the environment passed to the ember asset build. Defaults to 'production'
    apiBaseURL: 'http://testing.api.repositive.io',
    store: {
      type: 'redis',
      ssh: {
        host: 'testing.discover.repositive.io',
        username: 'repositive',
        privateKey: process.env.DEPLOY_KEY_PATH,
        dstPort: 6379,
        dstHost: 'localhost'
      }
    },
    assets: {
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      bucket: 'testing.discover.repositive.io'
      //region: 'eu-central-1'
    }
  },
  production: {
    buildEnv: 'production', // Override the environment passed to the ember asset build. Defaults to 'production'
    apiBaseURL: 'http://api.repositive.io',
    store: {
      type: 'redis',
      ssh: {
        host: 'discover.repositive.io',
        username: 'repositive',
        privateKey: process.env.DEPLOY_KEY_PATH,
        dstPort: 6379,
        dstHost: 'localhost'
      }
    },
    assets: {
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      bucket: 'discover.repositive.io'
      // region: 'eu-central-1',
    }
  },
  // AWS development
  aws_dev: {
    buildEnv: 'aws_dev', // Override the environment passed to the ember asset build. Defaults to 'production'
    apiBaseURL: 'http://backend-dev-amzn-us-east-1.repositive.io',
    store: {
      type: 'redis',
      ssh: {
        host: 'frontend-dev-amzn-us-east-1.repositive.io',
        username: 'repositive',
        dstPort: 6379,
        dstHost: 'localhost'
      }
    },
    assets: {
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      bucket: 'frontend-dev-amzn-us-east-1.repositive.io'
      // region: 'eu-central-1',
    }
  },
  // AWS staging
  aws_staging: {
    buildEnv: 'aws_staging', // Override the environment passed to the ember asset build. Defaults to 'production'
    apiBaseURL: 'http://backend-staging-amzn-us-east-1.repositive.io',
    store: {
      type: 'redis',
      ssh: {
        host: 'frontend-staging-amzn-us-east-1.repositive.io',
        username: 'repositive',
        dstPort: 6379,
        dstHost: 'localhost'
      }
    },
    assets: {
      accessKeyId: process.env.AWS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_KEY,
      bucket: 'frontend-staging-amzn-us-east-1.repositive.io'
      // region: 'eu-central-1',
    }
  }

};
