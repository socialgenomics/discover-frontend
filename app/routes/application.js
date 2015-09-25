import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  avatar: null, // used by the navbar and comment components
  actions:{
    search: function(query){
      this.transitionTo('datasets.search', {
        queryParams: {
          q: query,
          ordering: null,
          assayType: null,
          tags: null,
          repository: null,
          access: null,
        }
      });
    },
    initAvatar:function(){
      this.store.query('profile', {UserId: this.get('session.secure.user.id')})
      .then((profiles) => {
        let controller = this.get('controller');
        controller.set('avatar', profiles.get('firstObject.avatar'));
      });
    },
  }
});
