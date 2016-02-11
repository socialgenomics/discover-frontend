import Ember from 'ember';

export default Ember.Component.extend({
  didRender() {
    console.debug('Initializing typeform');
    try {
      // run typeform code
      new Typeform.Widget;
    } catch (e) {
      console.error('Error running type form code', e);
    }
  }
});
