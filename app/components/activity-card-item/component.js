import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['border-bottom', 'p3'],
  type: computed('dataset', function() {
    const model = get(this, 'dataset');
    let type = get(model, 'type');
    if (type === undefined) { //not favourite
      type = model.constructor.modelName;
    }
    if (type === 'dataset' && get(model, 'user_id') !== null) {
      type = 'registration';
    }
    return type;
  })
});
