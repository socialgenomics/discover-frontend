import DS from 'ember-data';
import ENV from 'repositive/config/environment';
import ApplicationAdapter from 'repositive/adapters/application';


export default ApplicationAdapter.extend({
  namespace: 'api/users',
  pathForType: function(type){
    return 'profiles';
  },
});
