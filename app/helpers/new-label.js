import Ember from 'ember';
import moment from 'moment';

export function newLabel([date, days = 14]) {
  const timeSince = moment(new Date()).diff(moment(date), 'days');
  if (timeSince <= days) {
    return Ember.String.htmlSafe(`<span class="u-tc-red u-fw-bold u-fs0"> NEW </span>`);
  }
}

export default Ember.Helper.helper(newLabel);
