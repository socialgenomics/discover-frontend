import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

const { get, set, setProperties } = Ember;

describe('Unit | Component | request form', function() {
  setupComponentTest('request-form', {
    needs: [
      'service:session',
      'component:validated-input',
      'component:r-async-button',
      'validator:presence'
    ],

    unit: true
  });

  describe('didReceiveAttrs', function() {
    it('sets savedTitle as title if present', function() {
      const component = this.subject();
      set(component, 'savedTitle', 'abc');
      component.didReceiveAttrs();
      expect(get(component, 'title')).to.eql('abc');
    });

    it('sets savedDescription as description if present', function() {
      const component = this.subject();
      set(component, 'savedDescription', 'abc');
      component.didReceiveAttrs();
      expect(get(component, 'description')).to.eql('abc');
    });
  });

  describe('willDestroyElement', function() {
    it('calls saveForLater if a title or description exists', function() {
      const component = this.subject();
      const title = 'abc';
      const saveForLater = obj => expect(obj.title).to.eql(title);
      setProperties(component, { title, saveForLater });
      component.willDestroyElement();
    });
  });
});
