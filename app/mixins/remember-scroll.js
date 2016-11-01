import Ember from 'ember';
const { Mixin, get, set, $, run } = Ember;

export default Mixin.create({
  activate: function() {
    this._super.apply(this, arguments);
    if (get(this, 'previousScrollPosition')) {
      run.next(() => {
        $(window).scrollTop(get(this, 'previousScrollPosition'));
      });
    } else {
      $(window).scrollTop(0);
    }
  },
  deactivate: function() {
    this._super.apply(this, arguments);
    set(this, 'previousScrollPosition', $(window).scrollTop());
  }
});
