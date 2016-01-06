import DS from 'ember-data';
import ENV from 'repositive/config/environment';


var ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api',
  host: ENV.APIBaseURL
});

export default ApplicationAdapter;
