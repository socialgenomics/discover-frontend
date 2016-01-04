module.exports = function(env) {
  // TODO: make this better
  let deployConfig = require('./' + env + '.json');
  deployConfig.s3.accessKeyId = process.env.AWS_KEY_ID;
  deployConfig.s3.secretAccessKey = process.env.AWS_ACCESS_KEY;
};
