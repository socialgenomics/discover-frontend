import DS from 'ember-data';
import ENV from 'repositive/config/environment';


if (ENV.environment === 'localDevelopment') {
  var ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api'
  });
} else {
  var ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'api',
    host: ENV.APIBaseURL
  });
}

export default ApplicationAdapter;
