import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  helpLink: 'help.registering-new-data',

  helpLinkData: [
    { query: 'data-reg', text: 'What data can I register?' },
    { query: 'see-reg', text: 'Who can see my registration?' },
    { query: 'include-reg', text: 'What information should I include in my registration?' },
    { query: 'store-raw', text: 'Do you store the raw data alongside the metadata I register?' },
    { query: 'view-reg', text: 'How do I know who has viewed my data registration?' },
    { query: 'add-meta', text: 'Can I add more metadata and description later?' },
    { query: 'access-reg', text: 'Can I choose who has access to my data?' }
  ]
});
