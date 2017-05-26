import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import Ember from 'ember';

const { get } = Ember;

describe('Unit | Component | RUI / r-tab-list', function() {
  setupComponentTest('rui/r-tab-list', {
    needs: [
      'validator:presence',
      'validator:format'
    ],
    unit: true
  });

  let component;

  beforeEach(function () {
    component = this.subject();
  });

  describe('properties', function () {
    it('should have correct class name set', function () {
      expect(get(component, 'classNames')).to.be.eql(['ember-view', 'c-card', 'ta-center', 'square', 'mb0']);
    });
  });
});
