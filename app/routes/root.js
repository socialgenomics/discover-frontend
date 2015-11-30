import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from 'repositive/config/environment';
import { shuffle } from 'repositive/utils/arrays';

let trending = {};

if (ENV.environment === "development"){
  trending = [
    'd096c88e-6a33-482f-a126-d2002c03fca6',
    'd096c88e-6a33-482f-a126-d2002c03fca6',
    'd096c88e-6a33-482f-a126-d2002c03fca6',
  ]
} else {
  trending = shuffle([
    '197190e2-4f48-4c28-ba7d-021ee4b99592',
    '5a59338e-7ad8-4875-98a7-63bca3cd1678',
    '9f897c89-1981-4931-86aa-8bdf2a7ae3d7',
    '81facbde-b5b8-426a-bd24-657e18d5e2d9',
    'd94c070c-dbbc-4283-b837-a00a436376d7',
    'ea992e6a-f3ca-41ad-85aa-1e4528b39a0e',
    '17ca6400-02ba-481f-aa80-646b9ba283d0',
    'd6c07424-4751-4623-a8c8-8dbfa6e4ecf3',
    '127c80fd-d3f7-40d2-89b3-51723d911ff2',
    '60a5781e-7953-4408-8271-62c3ff8bf3b3',
    'c0044f42-862c-4ab3-8964-83029d7a48d5',
    '1b95f0f8-d0f7-4f3b-af39-185b309c726e',
    '1392da4b-205a-43b7-addd-c0f672b7c8c1',
    '6110a494-06f9-45f0-8fe2-51419d74b406',
    '8b1a0e2d-4f19-4214-b331-f2758e3b9503',
    '08dfb517-77ec-4683-9bcc-2840ba31a5cd'
  ]).slice(0, 3);
}
export default Ember.Route.extend({

  model: function() {
    if (this.get('session.isAuthenticated')) {
      return Ember.RSVP.all([
        ajax({ url: ENV.APIRoutes['datasets.search'] , type: 'GET' }),
        this.store.findByIds('dataset', trending),
        this.store.query('dataset', { isRequest: true }),
        this.store.query('dataset', { repository: 'REPOSITIVE', isRequest: false })
      ])
      .then(function(data) {
        return {
          stats: data[0],
          datasets: data[1].slice(0, 3),
          requests: data[2],
          registered: data[3]
        };
      })
      .catch(function(err) {
        Ember.Logger.error(err);
      });
    } else {
      return null;
    }
  },
  actions: {
  }
});
