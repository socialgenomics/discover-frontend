import Ember from 'ember';

const { merge, Logger, get } = Ember;

/**
 * @desc Builds an object used to create an action.
 * @public
 * @param {Ember.DS.Model} model - The model which the action will belong to
 * @param {Ember.DS.Model} userId - The user model of this action's owner
 * @param {String} type - The type of action e.g. 'favourite'
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Object} An object to be passed to createRecord
 */
export function createActionData(model, userId, type, customProps = {}) {
  const dataObj = { type, userId };
  const modelName = get(model, 'constructor.modelName');

  dataObj[modelName + "Id"] = model;
  dataObj['actionable_model'] = modelName;
  return merge(dataObj, customProps);
}

/**
 * @desc builds an object to query for actions
 * @public
 * @param {Object} params - params must include type of action e.g. 'favourite'
 * @return {Object} Constructed query object
 */
export function buildActionsQuery(params) {
  const defaultObj = {
    'order[0][0]': 'updated_at',
    'order[0][1]': 'DESC',
    limit: 100
  };
  //Prefix params and merge with default object
  return Object.keys(params)
    .reduce((dataObj, key) => {
      const prefixedKey = key === 'modelId' ? 'where.actionable_id' : 'where.' + key;
      dataObj[prefixedKey] = params[key];
      return dataObj;
    }, defaultObj);
}

/**
 * @desc creates a view action for the provided model to increment view counter
 * @public
 * @param {Ember.DS.Store} store - Instance of the data store
 * @param {Ember.DS.Model} model - The model which will have its view stat incremented
 * @param {Ember.DS.Model} userId - The user model of this action's owner
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Promise} The response
 */
export function incrementViewCounter(store, model, userId, customProps = {}) {
  store.createRecord(
    'action',
    createActionData(model, userId = null, 'view', customProps)
  ).save().catch(Logger.error);
}
