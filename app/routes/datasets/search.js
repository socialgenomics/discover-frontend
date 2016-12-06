import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { get, inject: { service }, Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  searchService: service('search'),

  model: function(params) {
    console.log(params);
    const searchService = get(this, 'searchService');
    //might have to serialize urlString to queryString before passing it to updateQuery???
    return searchService.updateQuery(params.query);

    // return this.store.createRecord('Search', {
    //   queryParams: params,
    //   user: this.get('session.authenticatedUser')
    // });
  },

  // actions: {
  //   willTransition: function() {
  //     this._resetController();
  //   }
  // },
  //
  // _resetController: function() {
  //   this.controller.get('model').removeObserver('queryParams');
  //   this.controller.setProperties({
  //     q: null,
  //     ordering: null,
  //     assay: null,
  //     datasource: null,
  //     access: null
  //   });
  // }
});
