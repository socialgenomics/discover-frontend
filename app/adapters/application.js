import DS from 'ember-data';
import ENV from 'repositive/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { RESTAdapter } = DS;

const ApplicationAdapter = RESTAdapter.extend(DataAdapterMixin, {
  host: ENV.APIBaseURL,
  authorizer: 'authorizer:repositive'
});

export default ApplicationAdapter;
