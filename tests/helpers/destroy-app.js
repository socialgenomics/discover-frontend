/* eslint-disable */
import Ember from 'ember';

export default function destroyApp(application) {
  Ember.run(application, 'destroy');
  server.shutdown();
}
