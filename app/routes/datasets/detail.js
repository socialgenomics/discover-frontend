import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';

const { inject: { service }, Logger, Route, RSVP, get } = Ember;

export default Route.extend(ResetScrollMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params) {
    return this._getModelData(params, 'dataset')
      .then(data => {
        return RSVP.hash({
          dataset: data.model,
          stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null,
          tags: this._getTags(params.id)
        })
          .then(hash => {
            let keywords = [];
            hash.tags.forEach(t => keywords.push(get(t, 'properties').text));

            const dataset = hash.dataset;

            // Building schema.org JSON-LD
            const schema = `<script type="application/ld+json">
                {\n
                    "@context": "http:\/\/schema.org\/",\n"@type": "Dataset",\n
                    "name": "${get(dataset, 'title')}",\n
                    "description": "${get(dataset, 'description')}",\n
                    "url": "${get(dataset, 'url')}",\n
                    "keywords": ${JSON.stringify(keywords)}\n
                }\n
            </script>`;

            return RSVP.hash({
              dataset: dataset,
              stats: hash.stats,
              schema: schema
            });
          });
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
