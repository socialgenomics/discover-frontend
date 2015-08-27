import ApplicationAdapter from 'repositive/adapters/application';


export default ApplicationAdapter.extend({
  namespace: 'api/users',
  pathForType: function(){
    return 'settings';
  },
});
