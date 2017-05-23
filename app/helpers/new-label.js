import Ember from 'ember';
import moment from 'moment';

export function newLabel([date, days = 14]) {
  const timeSince = moment(new Date()).diff(moment(date), 'days');
  if (timeSince <= days) {
    return Ember.String.htmlSafe(`<span class="fc-red fw-bold fs0"> NEW </span>`);
  }
}

export default Ember.Helper.helper(newLabel);
