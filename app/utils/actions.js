import Ember from 'ember';

const { merge, Logger } = Ember;

/**
 * @desc Builds an object used to create an action.
 * @public
 * @param {Ember.DS.Model} model - The model which the action willl belong to
 * @param {Ember.DS.Model} userId - The user model of this action's owner
 * @param {String} type - The type of action e.g. 'favourite'
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Object} An object to be passed to createRecord
 */
export function createActionData(model, userId, type, customProps = {}) {
  const dataObj = { type, userId };
  const modelName = model.constructor.modelName;

  dataObj[modelName + "Id"] = model;
  dataObj['actionable_model'] = modelName;//TODO remove when safe
  return merge(dataObj, customProps);
}

/**
 * @desc build a query object
 * @public
 * @param {String} type - The type of action e.g. 'favourite'
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Object} Constructed query object
 */
export function buildActionsQuery(type, customProps = {}) {
  const dataObj = {
    'where.type': type,
    'order[0][0]': 'updated_at',
    'order[0][1]': 'DESC',
    limit: 100
  };

  //Prefix all customProps
  Object.keys(customProps).map(key => {
    dataObj['where.' + key] = customProps[key]
  });

  return dataObj;
}

/**
 * @desc builds a query object for actions of specific model
 * @public
 * @param {String} type - The type of action e.g. 'favourite'
 * @param {String} modelName - Name of the model on which to query actions
 * @param {String} modelId - Id of the model being queried
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Object} Constructed query object
 */
export function buildActionsQueryForModel(type, modelName, modelId, customProps = {}) {
  const dataObj = buildActionsQuery(type, customProps);

  dataObj['where.' + modelName + '_id'] = modelId;

  return dataObj;
}

/**
 * @desc fetches actions
 * @public
 * @param {Ember.DS.Store} store - Instance of the data store
 * @param {String} type - The type of action e.g. 'favourite'
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Promise} The promised actions
 */
export function fetchActions(store, type, customProps = {}) {
  return store.query('action', buildActionsQuery(type, customProps));
}

/**
 * @desc fetches actions for a specific model
 * @public
 * @param {Ember.DS.Store} store - Instance of the data store
 * @param {String} type - The type of action e.g. 'favourite'
 * @param {String} modelName - Name of the model on which to query actions
 * @param {String} modelId - Id of the model being queried
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Promise} The promised actions
 */
export function fetchActionsForModel(store, type, modelName, modelId, customProps = {}) {
  return store.query('action', buildActionsQueryForModel(type, modelName, modelId, customProps));
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
  store.createRecord('action', createActionData(model, userId = null, 'view', customProps))
    .save().catch(Logger.error);
}
