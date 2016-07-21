import { describeModule } from 'ember-mocha';
import Ember from 'ember';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function(name, options = {}) {
  describeModule(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }

      destroyApp(this.application);
    }
  });
}
