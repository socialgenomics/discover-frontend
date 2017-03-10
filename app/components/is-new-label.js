import Ember from 'ember';
import moment from 'moment';

const { Component, computed, get } = Ember;

export default Component.extend({
  tagName: 'span',
  classNames: ['u-tc-red', 'u-fs0'],

  isLessThanTwoWeeksOld: computed('updatedAt', function() {
    const date = moment(get(this, 'updatedAt'));
    const today = moment(new Date());
    const timeSince = today.diff(date, 'days');
    return timeSince <= 14;
  })
});
