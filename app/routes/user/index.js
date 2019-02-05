import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

const { Logger } = Ember;

export default Route.extend({
  ajax: service(),
  session: service(),
  favouritesService: service('favourites'),

  model: function () {
    const { id: userId } = this.paramsFor('user');
    if (get(this, 'session.session.isAuthenticated')) {
      return this.store.findRecord('user', userId)
        .then(user => {
          return { user, schema: this._buildSchema(user) };
        })
        .catch(err => {
          Logger.error(err);
          if (err.errors[0].status === 500) {
            throw err;
          }
        });
    } else {
      this.transitionTo('/');
    }
  },

  _buildSchema(user) {
    const schema = {
      "@context": "http://schema.org",
      "@type": "Person",
      name: `${get(user, 'firstname')} ${get(user, 'lastname')}`,
      "jobTitle": get(user, 'profile.work_role'),
      "affiliation": {
        "@type": "Organization",
        "name": get(user, 'profile.work_organisation')
      },
      "image": {
        "@type": "image",
        "url": get(user, 'profile.avatar')
      },
      "location": {
        "@type": "Place",
        "name": get(user, 'profile.location')
      },
      "description": get(user, 'profile.bio'),
      "interest": get(user, 'profile.interests'),
      "sameAs": []
    };

    const accounts = get(user, 'profile.accounts');
    for (let acc in accounts) {
      if (accounts.hasOwnProperty(acc)) {
        schema.sameAs.push(accounts[acc]);
      }
    }

    return `<script type="application/ld+json">${JSON.stringify(schema, 0, 2)}</script>`;
  }
});
