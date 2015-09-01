import DS from 'ember-data';
import ENV from 'repositive/config/environment';


if (ENV.environment === 'development'){
  var ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api'
  });
}
else if (ENV.environment === 'production' || ENV.environment === 'testing'){
  var ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
    host: ENV.APIBaseURL
  });
}

export default ApplicationAdapter;
