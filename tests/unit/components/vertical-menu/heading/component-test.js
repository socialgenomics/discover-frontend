import Ember from 'ember';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

const { get, setProperties } = Ember;
describe('Unit | Component | vertical menu/heading', function() {
  setupComponentTest('vertical-menu/heading', {
    // Specify the other units that are required for this test
    needs: ['component:fa-icon', 'service:metrics'],
    unit: true
  });
  describe('computed properties', function() {
    describe('isOpen', function() {
      it('is true when title and open group are equal', function() {
        let component = this.subject();
        setProperties(component, {
          'openGroup': 'ABC',
          'title': 'ABC'
        });
        expect(get(component, 'isOpen')).to.be.true;
      });

      it('is false when title and open group are not equal', function() {
        let component = this.subject();
        setProperties(component, {
          'openGroup': 'ABC',
          'title': 'XYZ'
        });
        expect(get(component, 'isOpen')).to.be.false;
      });
    });

    describe('icon', function() {
      it('is chevron-down when open', function() {
        let component = this.subject();
        setProperties(component, {
          'openGroup': 'ABC',
          'title': 'ABC'
        });
        expect(get(component, 'icon')).to.eql('chevron-down');
      });

      it('is chevron-right when closed', function() {
        let component = this.subject();
        setProperties(component, {
          'openGroup': 'ABC',
          'title': 'XYZ'
        });
        expect(get(component, 'icon')).to.eql('chevron-right');
      });
    });
  });
});
