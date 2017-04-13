import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  helpData: {
    other: [
      { link: 'help.other', query: 'why-tag', text: 'Why should I tag a dataset?' },
      { link: 'help.other', query: 'incorrect-tag', text: 'What should I do if a previous tag is incorrect?' },
      { link: 'help.other', query: 'contribute-discussion', text: 'How can I contribute to a discussion?' },
      { link: 'help.other', query: 'good-tag', text: 'What makes a good tag?' },
      { link: 'help.other', query: 'format', text: 'How can I format my descriptions and discussions?' }
    ],
    register: [
      { link: 'help.registering-new-data', query: 'data-reg', text: 'What data can I register?' },
      { link: 'help.registering-new-data', query: 'see-reg', text: 'Who can see my registration?' },
      { link: 'help.registering-new-data', query: 'include-reg', text: 'What information should I include in my registration?' },
      { link: 'help.registering-new-data', query: 'store-raw', text: 'Do you store the raw data alongside the metadata I register?' },
      { link: 'help.registering-new-data', query: 'view-reg', text: 'How do I know who has viewed my data registration?' },
      { link: 'help.registering-new-data', query: 'add-meta', text: 'Can I add more metadata and description later?' },
      { link: 'help.registering-new-data', query: 'access-reg', text: 'Can I choose who has access to my data?' }
    ],
    request: [
      { link: 'help.requesting-data', query: 'what-is-request', text: 'What is a data request?' },
      { link: 'help.requesting-data', query: 'what-can-request', text: 'What data can I request?' },
      { link: 'help.requesting-data', query: 'who-can-see', text: 'Who can see my request?' },
      { link: 'help.requesting-data', query: 'information-include', text: 'What information should I include in my request?' },
      { link: 'help.requesting-data', query: 'add-meta-later', text: 'Can I add more metadata and description later?' },
      { link: 'help.requesting-data', query: 'no-response', text: 'I don\'t have any responses to my request.' },
      { link: 'help.requesting-data', query: 'incorrect-response', text: 'The response to my request is not what I am looking for.' },
      { link: 'help.requesting-data', query: 'how-long', text: 'How long will my request be live for?' },
      { link: 'help.requesting-data', query: 'fulfil-request', text: 'I know where the requested data are. How can I respond to the request?' }
    ],
    searching: [
      { link: 'help.searching-for-data', query: 'search-query', text: 'How do I search on Repositive?' },
      { link: 'help.searching-for-data', query: 'algorithm', text: 'How does the search algorithm work?' },
      { link: 'help.searching-for-data', query: 'effective', text: 'How can I build my search query to make it more effective?' },
      { link: 'help.searching-for-data', query: 'boolean', text: 'What boolean operators can I use?' },
      { link: 'help.searching-for-data', query: 'predicated', text: 'What predicated search terms can I use?' },
      { link: 'help.searching-for-data', query: 'filters', text: 'What do all those filters mean?' }
    ],
    account: [
      { link: 'help.your-account', query: 'access', text: 'How can I access my account?' },
      { link: 'help.your-account', query: 'personalise', text: 'Can I personalise my notifications?' },
      { link: 'help.your-account', query: 'change-cred', text: 'How can I change my credentials?' },
      { link: 'help.your-account', query: 'change-pw', text: 'How can I change my password?' },
      { link: 'help.your-account', query: 'profile', text: 'Can I control who can see my profile?' }
    ]
  }
});
