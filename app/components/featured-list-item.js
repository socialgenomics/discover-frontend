import Ember from 'ember';
import moment from 'moment';

const { Component } = Ember;

export default Component.extend({
  classNames: ['featured-list-item'],
  didReceiveAttrs(){
    if(this._checkIfNew()){
      this.set('isNew', true);
    }
  },
  _checkIfNew(){
    let now = moment(new Date());
    let dateUpdated = moment(this.get('model.updatedAt'));
    let daysDifference = now.diff(dateUpdated, 'days');
    if (daysDifference < 7) {
      return true;
    } else {
      return false;
    }
  }
});
