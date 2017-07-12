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
        tag: {}
      });
      this.render(hbs`{{tag-item
        type=type
        userId=userId
        tag=tag
        tagText=tagText
        session=session}}`);
    });

    it('renders the text within a link', function() {
      expect(this.$('a').text().trim()).to.eql('ABC');
    });

    describe('when the tag belongs to the user', function() {
      it('renders a delete button', function() {
        expect(this.$('.t-tag-item-delete i').hasClass('fa-times')).to.be.true;
      });
    });

    describe('when the tag does not belong to the user', function() {
      it('does not render a delete button', function() {
        this.set('userId', '2');
        expect(this.$('span i').hasClass('fa-times')).to.be.false;
      });
    });
  });

  describe('given a tag of type interest', function() {
    beforeEach(function() {
      this.setProperties({
        userId: '1',
        type: 'interest',
        delete: sinon.spy()
      });
      this.render(hbs`{{tag-item
        type=type
        tagText=tagText
        userId=userId
        delete=delete
        session=session}}`);
    });

    it('displays the text and is not a link', function() {
      expect(this.$('span').eq(0).text().trim()).to.eql('ABC');
    });

    describe('when a userId is provided', function() {
      it('should render delete button if it belongs to the user', function() {
        expect(this.$('i').hasClass('fa-times')).to.be.true;
      });
      it('clicking the delete button should call delete', function() {
        this.$('.t-tag-item-delete').click();
        expect(this.get('delete').calledOnce).to.be.true;
      });
    });
  });
});
