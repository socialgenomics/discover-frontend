import Ember from 'ember';

const { Mixin, set, get } = Ember;

export default Mixin.create({
  queryParams: {
    query: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    }
  },
  actions: {
    loading(transition, route) {
      const controller = this.controllerFor(get(route, 'routeName'));
      set(controller, 'isLoading', true);
      transition.promise.finally(() => {
        set(controller, 'isLoading', false);
      });
    },
    error() { set(this, 'controller.isError', true); },
    willTransition() { set(this, 'controller.isError', false); }
  }
});
