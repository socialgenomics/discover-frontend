import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['red-text'],
  didReceiveAttrs(){
    if(this._checkIfNew()){
      this.set('isNew', true);
    }
  },
  _checkIfNew(){
    let now = moment(new Date());
    let dateUpdated = moment(this.updatedAt);
    let daysDifference = now.diff(dateUpdated, 'days');
    if (daysDifference < 7) {
      return true;
    } else {
      return false;
    }
  }
});
