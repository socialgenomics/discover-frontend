import Ember from 'ember';

const { Route, get } = Ember;

const navigationData = [
  {
    title: 'Account',
    links: [
      { target: 'help.your-account', query: 'access', text: 'How can I access my account?' },
      { target: 'help.your-account', query: 'personalise', text: 'Can I personalise my notifications?' },
      { target: 'help.your-account', query: 'change-cred', text: 'How can I change my credentials?' },
      { target: 'help.your-account', query: 'change-pw', text: 'How can I change my password?' },
      { target: 'help.your-account', query: 'profile', text: 'Can I control who can see my profile?' }
    ]
  },
  {
    title: 'Searching',
    links: [
      { target: 'help.searching-for-data', query: 'search-query', text: 'How do I search on Repositive?' },
      { target: 'help.searching-for-data', query: 'algorithm', text: 'How does the search algorithm work?' },
      { target: 'help.searching-for-data', query: 'effective', text: 'How can I build my search query to make it more effective?' },
      { target: 'help.searching-for-data', query: 'filters', text: 'What do all those filters mean?' }
    ]
  },
  {
    title: 'Registering Data',
    links: [
      { target: 'help.registering-new-data', query: 'data-reg', text: 'What data can I register?' },
      { target: 'help.registering-new-data', query: 'see-reg', text: 'Who can see my registration?' },
      { target: 'help.registering-new-data', query: 'include-reg', text: 'What information should I include in my registration?' },
      { target: 'help.registering-new-data', query: 'store-raw', text: 'Do you store the raw data alongside the metadata I register?' },
      { target: 'help.registering-new-data', query: 'view-reg', text: 'How do I know who has viewed my data registration?' },
      { target: 'help.registering-new-data', query: 'add-meta', text: 'Can I add more metadata and description later?' },
      { target: 'help.registering-new-data', query: 'access-reg', text: 'Can I choose who has access to my data?' }
    ]
  },
  {
    title: 'Requesting Data',
    links: [
      { target: 'help.requesting-data', query: 'what-is-request', text: 'What is a data request?' },
      { target: 'help.requesting-data', query: 'what-can-request', text: 'What data can I request?' },
      { target: 'help.requesting-data', query: 'who-can-see', text: 'Who can see my request?' },
      { target: 'help.requesting-data', query: 'information-include', text: 'What information should I include in my request?' },
      { target: 'help.requesting-data', query: 'add-meta-later', text: 'Can I add more metadata and description later?' },
      { target: 'help.requesting-data', query: 'no-response', text: 'I don\'t have any responses to my request.' },
      { target: 'help.requesting-data', query: 'incorrect-response', text: 'The response to my request is not what I am looking for.' },
      { target: 'help.requesting-data', query: 'how-long', text: 'How long will my request be live for?' },
      { target: 'help.requesting-data', query: 'fulfil-request', text: 'I know where the requested data are. How can I respond to the request?' }
    ]
  },
  {
    title: 'Other',
    links: [
      { target: 'help.other', query: 'why-tag', text: 'Why should I tag a dataset?' },
      { target: 'help.other', query: 'incorrect-tag', text: 'What should I do if a previous tag is incorrect?' },
      { target: 'help.other', query: 'contribute-discussion', text: 'How can I contribute to a discussion?' },
      { target: 'help.other', query: 'good-tag', text: 'What makes a good tag?' },
      { target: 'help.other', query: 'format', text: 'How can I format my descriptions and discussions?' },
      { target: 'help.other', query: 'reputation', text: 'What is the number next to my profile image?' }
    ]
  },
  {
    title: 'Attributes',
    links: [
      { target: 'help.attributes', query: 'adding-metadata', text: 'Can I add more metadata?' },
      { target: 'help.attributes', query: 'can-i-edit', text: 'Can I edit my dataset and add more description later?' },
      { target: 'help.attributes', query: 'who-can-add-metadata', text: 'Who can add metadata to a dataset?' },
      { target: 'help.attributes', query: 'why-add-metadata', text: 'Why should I add metadata?' }
    ]
  }
];

export default Route.extend({
  model() {
    return navigationData;
  },

  beforeModel(transition) {
    if (get(transition, 'targetName').split('.')[1] === 'index') {
      this.transitionTo('help.searching-for-data');
    }
  }
});
