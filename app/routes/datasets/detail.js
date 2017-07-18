import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';
import { buildActionsQuery, incrementViewCounter, sortComments } from 'repositive/utils/actions';
import { mergeAttributes } from 'repositive/utils/attributes';

const { inject: { service }, Logger, Route, RSVP, get, getWithDefault, isEmpty, setProperties } = Ember;

export default Route.extend(ResetScrollMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params, transition) {
    this._checkIfShouldUnfollow(params, transition, 'dataset');
    return this._getModelData(params, 'dataset')
      .then(data => {
        const modelId = params.id;
        return RSVP.hash({
          comments: data.comments,
          attributes: this.store.query('action', buildActionsQuery({type: 'attribute', modelId})),
          dataset: data.model,
          stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null,
          subscription: data.subscription,
          tags: data.tags
        });
      })
      .then(hash => {
        const keywords = hash.tags.mapBy('properties.text');
        const dataset = hash.dataset;
        const userIds = hash.attributes
          .mapBy('userId.id')
          .uniq();
        return RSVP.hash({
          comments: hash.comments,
          tags: hash.tags,
          attributes: hash.attributes,
          dataset: dataset,
          contributors: this._fetchUserData(userIds),
          stats: hash.stats,
          subscription: hash.subscription,
          schema: this._buildSchemaObj(dataset, keywords)
        });
      })
      .catch(Logger.error);
  },

  afterModel(model) {
    incrementViewCounter(this.store, model.dataset, get(this, 'session.authenticatedUser'));
  },

  setupController(controller, model) {
    this._super(...arguments);
    const sortedComments = sortComments(model.comments);
    const mergedAttributes = this._getMergedAttributes(model);
    const tags = get(model, 'tags').toArray();

    setProperties(controller, {
      'comments': sortedComments,
      'attributes': mergedAttributes,
      tags
    })
  },

  _getMergedAttributes(model) {
    const datasetAttrs = getWithDefault(model, 'dataset.properties.attributes', {});
    const actionAttrs = getWithDefault(model, 'attributes', []);
    return mergeAttributes(actionAttrs, datasetAttrs)
      .reject(attr =>  attr.key === 'pmid' && isEmpty(attr.value));
  },

  _buildSchemaObj(dataset, keywords) {
    const schemaObject = {
      '@context': 'http://schema.org/',
      '@type': 'Dataset',
      name: get(dataset, 'title'),
      description: get(dataset, 'description'),
      url: get(dataset, 'url'),
      keywords: keywords
    };
    return `<script type="application/ld+json">${JSON.stringify(schemaObject, 0, 2)}</script>`;
  },

  _fetchUserData(userIds) {
    return RSVP.all(
      userIds.reduce((queries, userId) => {
        return [...queries, ...[this.store.findRecord('user', userId)]];
      }, [])
    ).catch(Logger.error);
  }
});
