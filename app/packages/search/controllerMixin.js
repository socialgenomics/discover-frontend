// import Ember from 'ember';
// import _ from 'npm:lodash';
//
// const { Mixin, set, get, isPresent } = Ember;
//
// export default Mixin.create({
//   //It makes the code difficult to understand when messing with ember internals like this.
//   //TODO: REFACTOR
//   _qpChanged: function(controller, _prop) {
//     this._super(controller, _prop);
//     this.send('queryParamsDidChange');
//   },
//
//   actions: {
//     //These functions only allow one filter per aggregation.
//     addFilter: function(field, term) {
//       set(this, field, term); // change the query params
//     },
//
//     removeFilter: function(field /*term*/) {
//       set(this, field, null); // set query param to null
//     },
//
//     queryParamsDidChange: function() {
//       if (isPresent(get(this, 'model'))) {
//         //lodash is only used for this one line...
//         //TODO: refactor this so that we can remove lodash dependency
//         const qps = _.object(get(this, 'queryParams').map(param => {
//           return [param, get(this, param)];
//         }));
//         set(this, 'model.queryParams', qps);
//       }
//     }.on('queryParamsDidChange')
//   }
// });
