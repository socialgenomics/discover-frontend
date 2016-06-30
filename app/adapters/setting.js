import ApplicationAdapter from 'repositive/adapters/application';


export default ApplicationAdapter.extend({
  namespace: 'v1/users',
  pathForType: function() {
    return 'settings';
  }
});
