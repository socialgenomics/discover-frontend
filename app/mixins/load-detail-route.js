import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';

const { Mixin, get, Logger } = Ember;

export default Mixin.create({
  _getStats() {
    return ajax({ url: ENV.APIRoutes['stats'] , type: 'GET' });
  },

  _getComments(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'comment',
      'order[0][0]': 'updated_at',
      'order[0][1]': 'DESC',
      limit: 100 // Remove limit to 10 elements
    });
  },

  _getTags(actionableId) {
    return this.store.query('action', {
      'where.actionable_id': actionableId,
      'where.type': 'tag'
    });
  },
  
  _logPageView(model) {
    const userId = get(this, 'session.authenticatedUser');
    if (userId) {
      this.store.createRecord('action', {
        userId,
        actionableId: get(model, 'actionableId'),
        type: 'view',
        actionable_model: model.constructor.modelName
      })
      .save().catch(Logger.error);
    }
  },

  _peekOrCreate(store, id) {
    return store.peekRecord('actionable', id) || store.createRecord('actionable', { id });
  },

  //This returns a list of user_ids, no duplicates.
  _removeDuplicates(acc, curr) {
    if (acc.indexOf(curr) === -1) {
      acc.push({ 'where.user_id': curr });
    }
    return acc;
  }
});
