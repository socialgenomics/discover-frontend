import Ember from 'ember';
import moment from 'moment';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['red-text'],
  didReceiveAttrs() {
    if (this._checkIfNew()) {
      this.set('isNew', true);
    }
  },
  _checkIfNew() {
    const now = moment(new Date());
    const dateUpdated = moment(this.updatedAt);
    const daysDifference = now.diff(dateUpdated, 'days');
    if (daysDifference < 7) {
      return true;
    } else {
      return false;
    }
  }
});
