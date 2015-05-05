import DS from 'ember-data';
import ENV from 'repositive.io/config/environment';
import ApplicationAdapter from 'repositive.io/adapters/application';


export default ApplicationAdapter.extend({
  namespace: 'api/users',
  pathForType: function(type){
    return 'profiles';
  },
});
