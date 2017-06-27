import Ember from 'ember';

const { Route, get } = Ember;

const navigationData = [
  {
    title: 'Other',
    links: [
      { target: 'help.other', query: 'why-tag', text: 'Why should I tag a dataset?' },
      { target: 'help.other', query: 'incorrect-tag', text: 'What should I do if a previous tag is incorrect?' },
      { target: 'help.other', query: 'contribute-discussion', text: 'How can I contribute to a discussion?' },
      { target: 'help.other', query: 'good-tag', text: 'What makes a good tag?' },
      { target: 'help.other', query: 'format', text: 'How can I format my descriptions and discussions?' }
    ]
  },
  {
    title: 'Register',
    links: [
      { target: 'help.registering-new-data', query: 'data-reg', text: 'What data can I register?' },
      { target: 'help.registering-new-data', query: 'see-reg', text: 'Who can see my registration?' },
      { target: 'help.registering-new-data', query: 'include-reg', text: 'What information should I include in my registration?' },
      { target: 'help.registering-new-data', query: 'store-raw', text: 'Do you store the raw data alongside the metadata I register?' },
      { target: 'help.registering-new-data', query: 'view-reg', text: 'How do I know who has viewed my data registration?' },
      { target: 'help.registering-new-data', query: 'add-meta', text: 'Can I add more metadata and description later?' },
      { target: 'help.registering-new-data', query: 'access-reg', text: 'Can I choose who has access to my data?' }
    ]
  }
]

export default Route.extend({
  beforeModel(transition) {
    if (get(transition, 'targetName').split('.')[1] === 'index') {
      this.transitionTo('help.searching-for-data');
    }
  },
  model() {
    return navigationData;
  }
});
