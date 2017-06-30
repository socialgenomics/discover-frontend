import Ember from 'ember';
import ResetScrollMixin from 'repositive/mixins/reset-scroll';
import LoadDetailRouteMixin from 'repositive/mixins/load-detail-route';
import { fetchActionsForModel, incrementViewCounter } from 'repositive/utils/actions';

const { inject: { service }, Logger, Route, RSVP, get, getWithDefault, isEmpty, setProperties } = Ember;

export function mergeAssays(model, assaysFromUsers = []) {
  const assaysFromDataset = get(model, 'assay');
  const assaysFromProps = get(model, 'properties.attributes.assay');
  if (assaysFromProps) { return [...assaysFromProps, ...assaysFromUsers]; }
  if (assaysFromDataset) { return [...assaysFromDataset.split(','), ...assaysFromUsers]; }
  return assaysFromUsers;
}

export default Route.extend(ResetScrollMixin, LoadDetailRouteMixin, {
  session: service(),

  model(params, transition) {
    this._checkIfShouldUnfollow(params, transition, 'dataset');
    return this._getModelData(params, 'dataset')
      .then(data => {
        return RSVP.hash({
          comments: data.comments,
          attributes: fetchActionsForModel(this.store, 'attribute', 'dataset', params.id),
          dataset: data.model,
          stats: get(this, 'session.isAuthenticated') === false ? this._getStats() : null,
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
    const sortedComments = model.comments
      .toArray()
      .sortBy('createdAt')
      .reverseObjects();
    const mergedAttributes = this._getMergedAttributes(model);

    setProperties(controller, {
      'comments': sortedComments,
      'attributes': mergedAttributes
    })
  },

  actions: {
    didTransition() {
      get(this, 'metrics').trackPage();
      return true;
    }
  },

  _getMergedAttributes(model) {
    const datasetAttrs = getWithDefault(model, 'dataset.properties.attributes', {});
    const actionAttrs = getWithDefault(model, 'attributes', []);
    return this._mergeAttributes(actionAttrs, datasetAttrs)
      .reject(attr =>  attr.key === 'pmid' && isEmpty(attr.value));
  },

  _mergeAttributes(attributeActions = [], attributesFromDataset) {
    const actionAttrs = attributeActions.map(this._convertActionToCommonObj);
    const datasetAttrs = this._convertDatasetAttrsToCommonObjList(attributesFromDataset);
    return [...datasetAttrs, ...actionAttrs];
  },

  _convertActionToCommonObj(attribute) {
    return {
      key: get(attribute, 'properties.key'),
      value: get(attribute, 'properties.value'),
      actionId: get(attribute, 'id'),
      userId: get(attribute, 'userId.id')
    };
  },

  _convertDatasetAttrsToCommonObjList(attributesFromDataset) {
    if (attributesFromDataset) {
      return Object.keys(attributesFromDataset).reduce((attrObjects, key) => {
        const keyValue = attributesFromDataset[key];
        if (isEmpty(keyValue) || 'pmid' in keyValue) { return attrObjects; }
        return [
          ...attrObjects,
          ...keyValue.map(value => { return { key, value }; })
        ];
      }, []);
    } else { return []; }
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
