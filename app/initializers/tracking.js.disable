export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  var router = container.lookup('router:main');
  router.on('didTransition', function() {
    this.trackPageView(router.rootURL.slice(0, -1) + this.get('url'));
  });
}

export default {
  name: 'tracking',
  initialize: initialize
};
