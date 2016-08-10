import Ember from 'ember';
import searchMixin from 'repositive/packages/search/controllerMixin';


export default Ember.Controller.extend(
  searchMixin,
  Ember.Evented,
{
  queryParams: ['q', 'ordering', 'assay', 'datasource', 'access'],
  q: null,
  ordering: null,
  assay: null,
  //tags: null,
  datasource: null,
  access: null,
  resultsPerPage: 30,
  totalPages: Ember.computed('model.meta.total', 'resultsPerPage', function() {
    const resultsPerPage = this.get('resultsPerPage');
    const totalResults = this.get('model.meta.total');
    return Math.ceil(totalResults / resultsPerPage);
  }),
  currentPageNumber: Ember.computed('model.offset', 'resultsPerPage', function() {
    const resultsPerPage = this.get('resultsPerPage');
    const offset = this.get('model.offset') || 0;
    return Math.ceil(offset / resultsPerPage) + 1;
  }),
  //returns list of offsets
  //element 0 = offset for firstpage etc.
  pageNumberList: Ember.computed('totalPages', 'resultsPerPage', function() {
    const totalPages = this.get('totalPages');
    const resultsPerPage = this.get('resultsPerPage');
    let pageList = [];
    for (let i = 0; i < totalPages; i++) {
      const pageOffset = i * resultsPerPage;
      pageList.push(pageOffset);
    }
    return pageList;
  }),

  modelLoadingDidChange: function() {
    if (!this.get('model.isLoading')) {
      // The view subscribes to this function
      // so that it can call some jquery after the
      // model has finised rendering
      Ember.run.schedule('afterRender', this, ()=> {
        this.trigger('modelLoaded');
      });
    }
  }.observes('model.isLoading'),


  actions: {
    changePage(pageNumber) {
      const pageNumberList = this.get('pageNumberList');
      this.set('model.isLoading', true);
      this.get('model.datasets').clear();
      this.set('model.offset', pageNumberList[pageNumber - 1]);
    },

    previousPage() {
      const resultsPerPage = this.get('resultsPerPage');
      this.set('model.isLoading', true);
      this.get('model.datasets').clear();
      this.get('model').decrementProperty('offset', resultsPerPage);
    },

    nextPage() {
      const resultsPerPage = this.get('resultsPerPage');
      this.set('model.isLoading', true);
      this.get('model.datasets').clear();
      this.get('model').incrementProperty('offset', resultsPerPage);
    }
  }
});
