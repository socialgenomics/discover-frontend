import DS from 'ember-data';
import ENV from 'repositive/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

var ApplicationAdapter = DS.RESTAdapter.extend(DataAdapterMixin, {
  // namespace: 'v1',
  host: ENV.APIBaseURL,
  authorizer: 'authorizer:repositive'
});

export default ApplicationAdapter;
