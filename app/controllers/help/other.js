import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['help'],
  help: null,
  helpLink: 'help.other',

  helpLinkData: [
    { query: 'why-tag', text: 'Why should I tag a dataset?' },
    { query: 'incorrect-tag', text: 'What should I do if a previous tag is incorrect?' },
    { query: 'contribute-discussion', text: 'How can I contribute to a discussion?' },
    { query: 'good-tag', text: 'What makes a good tag?' },
    { query: 'format', text: 'How can I format my descriptions and discussions?' }
  ]
});
