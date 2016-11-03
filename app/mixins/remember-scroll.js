import Ember from 'ember';
const { Mixin, get, set, run } = Ember;

export default Mixin.create({
  activate: function() {
    this._super(...arguments);
    run.next(() => {
      window.scrollTo(0, get(this, 'previousScrollPosition') || 0);
    });
  },
  deactivate: function() {
    this._super(...arguments);
    set(this, 'previousScrollPosition', window.scrollY);
  }
});
