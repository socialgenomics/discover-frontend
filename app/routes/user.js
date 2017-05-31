import Ember from 'ember';
import ENV from 'repositive/config/environment';

const {
  inject: {
    service
  },
  Route,
  RSVP,
  get,
  Logger,
  isEmpty
} = Ember;

export default Route.extend({
  ajax: service(),
  session: service(),
  favouritesService: service('favourites'),

  model: function (params) {
    if (get(this, 'session.session.isAuthenticated')) {
      return this.store.findRecord('user', params.id)
        .then(user => this._getProfileData(user, params))
        .then(this._getDiscussionsAndContributions.bind(this))
        .then(values => {
          this.controllerFor('user.index').set('favouritedData', values.profileData.favourited_data);
          const discussions = [...values.datasetDiscussions.toArray(), ...values.requestDiscussions.toArray()];
          return {
            user: values.profileData.user,
            registrations: values.profileData.registrations,
            requests: values.profileData.requests,
            discussions,
            contributions: values.datasetContributions,
            schema: this._buildSchema(values.profileData.user)
          };
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

  _getProfileData(user, params) {
    const userId = get(user, 'id');
    return RSVP.hash({
      user: user,
      registrations: this.store.query('dataset', {
        'where.user_id': userId,
        'order[0][0]': 'created_at',
        'order[0][1]': 'DESC',
        'limit': 50
      }),
      requests: this.store.query('request', {
        'where.user_id': userId,
        'order[0][0]': 'created_at',
        'order[0][1]': 'DESC',
        'limit': 50
      }),
      discussions: this.store.query('action', {
        'where.user_id': userId,
        'where.type': 'comment',
        'limit': 50
      }),
      contributions: this.store.query('action', {
        'where.user_id': userId,
        'where.type': 'attribute',
        'limit': 50
      }),
      favourited_data: this._getFavouritedData(params.id)
    });
  },

  _getDiscussionsAndContributions(profileData) {
    const datasetContributionIds = this._getUniqueIds(profileData.contributions, 'dataset');
    const datasetDiscussionIds = this._getUniqueIds(profileData.discussions, 'dataset');
    const requestDiscussionIds = this._getUniqueIds(profileData.discussions, 'request');

    const datasetContributions = isEmpty(datasetContributionIds) ? [] : this._createQuery(datasetContributionIds, 'dataset');
    const datasetDiscussions = isEmpty(datasetDiscussionIds) ? [] : this._createQuery(datasetDiscussionIds, 'dataset');
    const requestDiscussions = isEmpty(requestDiscussionIds) ? [] : this._createQuery(requestDiscussionIds, 'request');

    return RSVP.hash({
      profileData,
      datasetContributions,
      datasetDiscussions,
      requestDiscussions
    });
  },

  _createQuery(ids, modelType) {
    return this.store.query(modelType, {
      'where.id': ids,
      limit: 50
    });
  },

  _getUniqueIds(arrayOfObjs, modelType) {
    return arrayOfObjs
      .filterBy('actionable_model', modelType)
      .mapBy('actionableId.id')
      .uniq();
  },

  _getFavouritedData(userIdOfProfile) {
    const ajax = get(this, 'ajax');
    return RSVP.hash({
      datasets: ajax.request(ENV.APIRoutes['favourite-datasets'].replace('{user_id}', userIdOfProfile), {
        method: 'GET'
      }),
      requests: ajax.request(ENV.APIRoutes['favourite-requests'].replace('{user_id}', userIdOfProfile), {
        method: 'GET'
      })
    })
      .then(data => {
        const datasets = data.datasets.map(datasetObj => {
          return this.store.push(this.store.normalize('dataset', datasetObj));
        });
        const requests = data.requests.map(requestObj => {
          return this.store.push(this.store.normalize('request', requestObj));
        });
        return [...datasets, ...requests];
      }).catch(Logger.error);
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
