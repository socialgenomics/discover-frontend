import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | request form', function() {
  setupComponentTest('request-form', {
    integration: true
  });

  // describe('didReceiveAttrs', function() {
  //   // const str = 'abc';
  //
  //   it('sets title to saved title', function() {
  //     // this.set('savedTitle', str);
  //     this.render(hbs`{{request-form savedTitle='abc'}}`);
  //     expect(this.get('savedTitle')).to.eql('abc');
  //   });
  //
  //   // it('sets description to saved description', function() {
  //   //
  //   // });
  // });
});
