export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  container.register('authenticator:googleplus', application.GooglePlusAuthenticator);
};

export default {
  name: 'google-plus-authenticator',
  before: 'simple-auth',
  initialize: initialize
};
