import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration | Component | tag item', function() {
  setupComponentTest('tag-item', {
    integration: true
  });

  beforeEach(function() {
    this.setProperties({
      tagText: 'ABC',
      session: { session: { authenticated: { user: { id: '1' } } } }
    });
  });

  describe('given a tag of type tag', function() {
    beforeEach(function() {
      this.setProperties({
        type: 'tag',
        userId: '1',
        tag: {
          destroyRecord: sinon.spy()
        }
      });
      this.render(hbs`{{tag-item
        type=type
        userId=userId
        tag=tag
        tagText=tagText
        session=session}}`);
    });

    describe('when the tag belongs to the user', function() {
      it('renders a delete button', function() {
        expect(this.$('span i').hasClass('fa-times')).to.be.true;
      });
    });

    describe('when the tag does not belong to the user', function() {
      it('does not render a delete button', function() {
        this.set('userId', '2');
        expect(this.$('span i').hasClass('fa-times')).to.be.false;
      });
    });
  });
});
