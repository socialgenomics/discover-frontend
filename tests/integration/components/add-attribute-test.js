import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

describe('Integration | Component | add attribute', function() {
  setupComponentTest('add-attribute', {
    integration: true
  });
  describe('actions', function() {
    beforeEach(function () {
      this.setProperties({
        'addAttribute': sinon.spy(),
        'closeInput': sinon.spy(),
        'group': 'assay',
        'attributesForKey': [{ value: 'ExistingAttr' }]
      })
      this.render(hbs`{{add-attribute
        addAttribute=addAttribute
        attributesForKey=attributesForKey
        closeInput=closeInput
        group=group}}`);
    });

    describe('add', function() {
      it('calls passed in addAttribute function with correct args', function() {
        this.$('input').val('ABC').change();
        this.$('button.c-btn-primary').click();
        expect(this.get('addAttribute').calledOnce).to.be.true;
        expect(this.get('addAttribute').calledWith('assay', 'ABC')).to.be.true;
      });

      it('rejects duplicate inputs', function() {
        this.$('input').val('ExistingAttr').change();
        this.$('button.c-btn-primary').click();
        expect(this.get('addAttribute').notCalled).to.be.true;
      })

      it('rejects duplicate inputs regarless of case', function() {
        this.$('input').val('eXISTingaTTr').change();
        this.$('button.c-btn-primary').click();
        expect(this.get('addAttribute').notCalled).to.be.true;
      })

      it('rejects blank input', function() {
        this.$('input').val('').change();
        this.$('button.c-btn-primary').click();
        expect(this.get('addAttribute').notCalled).to.be.true;
      })
    });

    describe('cancel', function() {
      it('calls passed in addAttribute function with correct args', function() {
        this.$('button.c-btn-text-secondary').click();
        expect(this.get('closeInput').calledOnce).to.be.true;
      });
    });
  });
});
