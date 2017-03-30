import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tabs: [
    { title: 'Searching for Data', target: 'help.searching-for-data', query: 'search-query', noBorder: true },
    { title: 'Requesting Data', target: 'help.requesting-data', query: 'what-is-request' },
    { title: 'Registering new Data', target: 'help.registering-new-data', query: 'data-reg' },
    { title: 'Your Account', target: 'help.your-account', query: 'access' },
    { title: 'Other Common Issues', target: 'help.other', query: 'why-tag' }
  ]
});
