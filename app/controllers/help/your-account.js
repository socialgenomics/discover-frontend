import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  helpLink: 'help.your-account',
  currentPage: window.location.pathname,

  helpLinkData: [
    { query: 'access', text: 'How can I access my account?' },
    { query: 'personalise', text: 'Can I personalise my notifications?' },
    { query: 'change-cred', text: 'How can I change my credentials?' },
    { query: 'change-pw', text: 'How can I change my password?' },
    { query: 'profile', text: 'Can I control who can see my profile?' }
  ]
});
