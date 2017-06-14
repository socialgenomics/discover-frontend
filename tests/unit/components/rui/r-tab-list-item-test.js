import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import Ember from 'ember';

const { get } = Ember;

describe('Unit | Component | RUI / r-tab-list-item', function() {
  setupComponentTest('rui/r-tab-list-item', {
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
      expect(get(component, 'classNames').toString()).to.be.eql('flex-auto cursor-pointer fc-secondary fs2 fw-med p2');
    });

    it('should have correct classNameBindings set', function () {
      expect(get(component, 'classNameBindings')).to.be.eql(['isActive:bc-white:bc-very-light-grey', 'isActive::u-hv-bc-very-light-grey']);
    });
  });
});
