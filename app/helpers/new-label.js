import Ember from 'ember';
import moment from 'moment';
//Using destructuring fails tests so I had to do it the ES5 way.
export function newLabel(params) {
  let date, days;
  if (Array.isArray(params)) {
    date = params[0];
    days = params[1];
  } else {
    date = params;
    days = 14;
  }
  const timeSince = moment(new Date()).diff(moment(date), 'days');
  if (timeSince <= days) {
    return Ember.String.htmlSafe(`<span class="u-tc-red u-fs0"> NEW </span>`);
  }
}

export default Ember.Helper.helper(newLabel);
