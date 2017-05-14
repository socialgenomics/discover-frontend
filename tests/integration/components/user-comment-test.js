import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import targetBlankLinks from 'repositive/initializers/register-showdown-extensions';

const { setProperties } = Ember;
const id = 'id';

describe('Integration | Component | user comment', function() {
  setupComponentTest('user-comment', {
    integration: true
  });

  beforeEach(function () {
    // manually initialize targetBlankLinks showdown extension used for markdown-to-html
    // initializers are not called in text env
    targetBlankLinks.initialize();
  });

  function setupState(context) {
    setProperties(context, {
      disabled: false,
      comment: {
        userId: {
          id,
          displayName: 'foo'
        },
        properties: { text: 'lorem ipsum' }
      }
    });
  }

  describe('edit icon button', function () {
    it('should be visible', function () {
      setupState(this);

      this.render(hbs`{{user-comment comment=comment disabled=disabled canEdit=true}}`);
      expect(this.$('i.fa-pencil')).to.have.length(1);
    });

    it('should not be visible if user doesn\'t have edit rights', function () {
      setupState(this);

      this.render(hbs`{{user-comment comment=comment disabled=disabled canEdit=false}}`);
      expect(this.$('i.fa-pencil')).to.have.length(0);
    });

    it('should not be visible if edit mode is on', function () {
      setupState(this);

      this.render(hbs`{{user-comment comment=comment disabled=disabled canEdit=true}}`);
      this.$('i.fa-pencil').click();

      expect(this.$('i.fa-pencil')).to.have.length(0);
    });

    it('should trigger edit mode on click', function () {
      setupState(this);

      this.render(hbs`{{user-comment comment=comment canEdit=true}}`);
      this.$('i.fa-pencil').click();

      expect(this.$('p.u-markdown-formatting')).to.have.length(0);
      expect(this.$('form .c-validated-input')).to.have.length(1);
    });
  });

  describe('edit mode', function () {
    it('should have save and cancel buttons', function () {
      setupState(this);

      this.render(hbs`{{user-comment comment=comment canEdit=true inEditMode=true}}`);

      const commentButton = this.$('button.c-btn-primary');
      const cancelButton = this.$('button.c-btn-cancel');

      expect(commentButton).to.have.length(1);
      expect(cancelButton).to.have.length(1);
      expect(commentButton.text().trim()).to.be.equal('Save');
      expect(cancelButton.text().trim()).to.be.equal('Cancel');
    });

    describe('cancel button', function () {
      it('should go back to display mode', function () {
        setupState(this);

        this.render(hbs`{{user-comment comment=comment canEdit=true inEditMode=true}}`);
        this.$('button.c-btn-cancel').click();

        expect(this.$('p.u-markdown-formatting')).to.have.length(1);
        expect(this.$('form .c-validated-input')).to.have.length(0);
      });

      it('should reset comment message to previous value', function () {
        const text = 'Foo Bar';

        this.render(hbs`{{user-comment comment=comment canEdit=true inEditMode=true}}`);
        this.$('form .c-validated-input textarea').val('Foo Bar');
        this.$('form .c-validated-input textarea').change(text);
        this.$('button.c-btn-text-secondary').click();

        expect(this.$('p.u-markdown-formatting').text()).to.not.be.equal(text);
        this.$('i.fa-pencil').click();
        expect(this.$('form .c-validated-input textarea').text()).to.not.be.equal(text);
      });
    });
  });
});
