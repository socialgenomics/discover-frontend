import Ember from 'ember';

const { merge } = Ember;

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
 * @desc fetches actions
 * @public
 * @param {Ember.DS.Store} store - The store object
 * @param {String} type - The type of action e.g. 'favourite'
 * @param {Object?} customProps - Other properties to be added to the action object.
 * @return {Promise} The promised query results
 */
export function fetchActions(store, type, customProps = {}) {
  const dataObj = {
    'where.type': type,
    'order[0][0]': 'updated_at',
    'order[0][1]': 'DESC',
    limit: 100
  };
  const prefix = 'where.';
  const model = customProps.model;
  delete customProps.model;

  if (model) {
    const modelName = model.constructor.modelName;
    dataObj[prefix + modelName + '_id'] = model.id;
  }

  //Prefix all customProps
  Object.keys(customProps).map(key => {
    dataObj[prefix + key] = customProps[key]
  });

  return store.query('action', dataObj);
}
