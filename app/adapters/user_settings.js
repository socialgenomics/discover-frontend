import ApplicationAdapter from 'repositive/adapters/application';

export default ApplicationAdapter.extend({
  namespace: 'users',
  pathForType: function() {
    return 'user_settings';
  }
});
