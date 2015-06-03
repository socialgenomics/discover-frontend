import Ember from 'ember';


export function initialize(/* container, application */) {
  // application.inject('route', 'foo', 'service:foo');
  Ember.View.reopen({
    didInsertElement : function(){
      this._super();
      Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
    },
    afterRenderEvent : function(){
      // implement this hook in your own subclasses and run your jQuery logic there
    }
  });
}

export default {
  name: 'after-render-event',
  initialize: initialize
};
