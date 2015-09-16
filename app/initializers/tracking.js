export function initialize(container, application) {
  application.inject('route', 'metrics', 'service:metrics');
  application.inject('controller', 'metrics', 'service:metrics');
  application.inject('component', 'metrics', 'service:metrics');
}

export default {
  name: 'tracking',
  after: "metrics",
  initialize: initialize,
};
