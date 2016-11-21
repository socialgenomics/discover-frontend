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

            let dataset = hash.dataset;
            // Building schema.org JSON-LD
            let schema = '<script type="application/ld+json">';
            schema += '{\n"@context": "http:\/\/schema.org\/",\n"@type": "Dataset",\n';
            schema += `"name": "${get(dataset, 'title')}",\n`;
            schema += `"description": "${get(dataset, 'description')}",\n`;
            schema += `"url": "${get(dataset, 'url')}",\n`;
            schema += `"keywords": ${JSON.stringify(keywords)}\n`;
            schema += '}\n</script>';

            return RSVP.hash({
              dataset: hash.dataset,
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
