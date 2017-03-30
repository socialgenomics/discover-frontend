import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  helpLink: 'help.searching-for-data',

  helpLinkData: [
    { query: 'search-query', text: 'How do I search on Repositive?' },
    { query: 'algorithm', text: 'How does the search algorithm work?' },
    { query: 'effective', text: 'How can I build my search query to make it more effective?' },
    { query: 'boolean', text: 'What boolean operators can I use?' },
    { query: 'predicated', text: 'What predicated search terms can I use?' },
    { query: 'filters', text: 'What do all those filters mean?' }
  ]
});
