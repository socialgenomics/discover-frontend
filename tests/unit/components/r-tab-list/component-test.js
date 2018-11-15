import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import Ember from 'ember';

const { get } = Ember;

describe('Unit | Component | r-tab-list', function() {
  setupComponentTest('r-tab-list', {
    needs: [],
    unit: true
  });

  let component;

  beforeEach(function () {
    component = this.subject();
  });

  describe('properties', function () {
    it('should have correct class name set', function () {
      expect(get(component, 'classNames').toString()).to.be.eql('list-flush-left flex fc-primary ta-center mb0 r-tab-list');
    });
  });
});
