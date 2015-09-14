import Ember from 'ember';
import ENV from 'repositive/config/environment';

export default Ember.Mixin.create({
  location: ENV.locationType,
  metrics: Ember.inject.service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    Ember.run.scheduleOnce('afterRender', this, () => {
      const page = document.location.href;
      const title = Ember.getWithDefault(this, 'routeName', 'unknown');

      Ember.get(this, 'metrics').trackPage({ page, title });
    });
  }
});
