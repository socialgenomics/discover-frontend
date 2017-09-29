import Ember from 'ember';
import PowerSelectOptions from 'ember-power-select/components/power-select/options';

const { computed: { alias } } = Ember;

export default PowerSelectOptions.extend({
  isLoading: alias('extra.isFetching')
});
