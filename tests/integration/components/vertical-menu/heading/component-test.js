import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | vertical menu/heading', function() {
  setupComponentTest('vertical-menu/heading', {
    integration: true
  });

  it('calls clickHandler function', function() {
    const title = 'abc';
    this.setProperties({
      'handleClick': function(text) { expect(text).to.eql(title) },
      title
    });
    this.render(hbs`{{vertical-menu/heading title=title handleClick=handleClick}}`);
    this.$('.t-vertical-menu-heading').click();
  });

  describe('classes', function() {
    it('has correct background class when open', function() {
      this.render(hbs`{{vertical-menu/heading title='abc' openGroup='abc'}}`);
      expect(this.$('.t-vertical-menu-heading').hasClass('bc-very-light-grey')).to.be.true;
    });
    it('has correct background class when closed', function() {
      this.render(hbs`{{vertical-menu/heading title='abc' openGroup='xyz'}}`);
      expect(this.$('.t-vertical-menu-heading').hasClass('bc-very-light-grey')).to.be.false;
    });
  });
});
