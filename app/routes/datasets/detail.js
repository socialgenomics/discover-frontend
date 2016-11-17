import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

const { inject: { service }, Logger, Route, RSVP, get } = Ember;

export default Route.extend(ResetScrollMixin, LoadDetailRouteMixin, {
  session: service(),

  beforeModel() {
    console.log(get(this, 'session.data.isOpenPage'));
    if (get(this, 'session.isAuthenticated') === false) {
      get(this, 'session').set('data.isOpenPage', true);
      console.log(get(this, 'session.data.isOpenPage'));
    }
  },

  model(params) {
    return this._getModelData(params, 'dataset')
    .then(data => {
      return RSVP.hash({
        dataset: data.model,
        stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null
      });
    })
    .catch(Logger.error);
  },

  afterModel(model) {
    this._incrementViewCounter(model.dataset);
  },

  actions: {
    didTransition() {
      get(this, 'metrics').trackPage();
      return true;
    }
  }
});
