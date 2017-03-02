import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';

const { inject: { service }, Logger, Route, RSVP, get, set } = Ember;

export default Route.extend(ResetScrollMixin, LoadDetailRouteMixin, FlashMessageMixin, {
  session: service(),

  model(params, transition) {
    if (transition.queryParams.unfollow) {
      const userId = get(this, 'session.authenticatedUser.id');
      return this.store.query('subscription', {
        'where.user_id': userId,
        'where.subscribable_id': params.id
      })
        .then(subscription => {
          set(subscription, 'active', false);
          return subscription.save();
        })
          .then(this.transitionTo('root'))
          .then(this._addFlashMessage('You have successfully unfollowed this dataset.', 'success'))
          .catch(error => {
            Logger.error(error);
            this._addFlashMessage('There was a problem unfollowing this dataset, please try again.', 'warning');
          });
    }
    return this._getModelData(params, 'dataset')
      .then(data => {
        return RSVP.hash({
          dataset: data.model,
          stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null,
          tags: data.tags
        })
          .then(hash => {
            let keywords = [];
            hash.tags.forEach(t => keywords.push(get(t, 'properties').text));

            const dataset = hash.dataset;

            // Building schema.org JSON-LD
            const schemaObject = {
              '@context': 'http://schema.org/',
              '@type': 'Dataset',
              name: get(dataset, 'title'),
              description: get(dataset, 'description'),
              url: get(dataset, 'url'),
              keywords: keywords
            };
            const schema = `<script type="application/ld+json">${JSON.stringify(schemaObject, 0, 2)}</script>`;

            return RSVP.hash({
              dataset: dataset,
              stats: hash.stats,
              schema: schema
            });
          })
      })
      .catch(Logger.error);
  },

  afterModel(model) {
    this._incrementViewCounter(model.dataset, get(this, 'session.authenticatedUser'));
  },

  actions: {
    didTransition() {
      get(this, 'metrics').trackPage();
      return true;
    }
  }
});
