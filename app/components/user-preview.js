import Ember from 'ember';

const { inject: { service }, Component, computed, get, set } = Ember;

export default Component.extend({
  session: service(),
  classNames: ['u-pos-relative', 'u-py2']
});
