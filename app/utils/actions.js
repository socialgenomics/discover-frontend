
/**
 * @desc Builds an object used to create an action.
 * @public
 * @param {Ember.DS.Model} model - The model which the action willl belong to
 * @param {Ember.DS.Model} userId - The user model of this action's owner
 * @param {String} type - The type of action e.g. 'favourite'
 * @return {Object} An object to be passed to createRecord
 */
export function createActionData(model, userId, type) {
  const dataObj = { type, userId };
  const modelName = model.constructor.modelName;

  dataObj[modelName] = model.id;
  return dataObj;
}
