import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['help'],
  help: null,
  helpLink: 'help.requesting-data',

  helpLinkData: [
    { query: 'what-is', text: 'What is a data request?' },
    { query: 'what-can', text: 'What data can I request?' },
    { query: 'who-can-see', text: 'Who can see my request?' },
    { query: 'information-include', text: 'What information should I include in my request?' },
    { query: 'add-meta-later', text: 'Can I add more metadata and description later?' },
    { query: 'no-response', text: 'I don\'t have any responses to my request.' },
    { query: 'incorrect-response', text: 'The response to my request is not what I am looking for.' },
    { query: 'how-long', text: 'How long will my request be live for?' },
    { query: 'fulfil-request', text: 'I know where the requested data are. How can I respond to the request?' }
  ]
});
