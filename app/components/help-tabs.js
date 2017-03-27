import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tabs: [
    { title: 'Searching for Data', target: 'help.searching-for-data', queryParams: 'search-query', noBorder: true },
    { title: 'Requesting Data', target: 'help.requesting-data', queryParams: 'what-is' },
    { title: 'Registering new Data', target: 'help.registering-new-data', queryParams: 'data-reg' },
    { title: 'Your Account', target: 'help.your-account', queryParams: 'access' },
    { title: 'Other Common Issues', target: 'help.other', queryParams: 'why-tag' }
  ]
});
