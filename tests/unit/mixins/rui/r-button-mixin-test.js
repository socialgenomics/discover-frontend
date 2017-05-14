import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import Ember from 'ember';
import sinon from 'sinon';
import RuiRButtonMixinMixin from 'repositive/mixins/rui/r-button-mixin';

const { get, set } = Ember;

describe('Unit | Mixin | RUI / r-button-mixin', function() {
  let subject;

  beforeEach(function () {
    const RuiRButtonMixinObject = Ember.Object.extend(RuiRButtonMixinMixin, {
      _super: sinon.spy()
    });

    subject = RuiRButtonMixinObject.create();
  });

  describe('properties', function () {
    it('should have correct classNames set', function () {
      expect(get(subject, 'classNames')).to.be.eql(['c-btn']);
    });

    it('should have correct classNameBindings set', function () {
      expect(get(subject, 'classNameBindings')).to.be.eql([
        // types
        'primary:c-btn-primary',
        'secondary:c-btn-secondary',
        'cancel:c-btn-cancel',

        // states
        'loading:c-btn-loading',

        // sizes
        'small:u-px2',
        'small:u-py1'
      ]);
    });

    it('should have correct options set', function () {
      expect(get(subject, 'options')).to.be.eql({
        variant: ['primary', 'secondary', 'cancel'],
        size: ['small', 'big']
      });
    });

    it('should have correct defaults set', function () {
      expect(get(subject, 'defaults')).to.be.eql({
        variant: 'secondary',
        size: 'small'
      });
    });
  });

  describe('methods', function () {
    describe('init', function () {
      const method = this.title;

      it('should call _setOptionFlag for each key in options property', function () {
        set(subject, '_setOptionFlag', sinon.spy());

        subject[method]();

        Object.keys(get(subject, 'options')).forEach(key => {
          expect(get(subject, '_setOptionFlag').calledWith(key)).to.be.equal(true);
        });
      });
    });

    describe('_setOptionFlag', function () {
      const method = this.title;
      const flagType = 'size';
      const flagName = 'big';

      it('should set given flagName', function () {
        subject.setProperties({
          _isValidFlagName: sinon.stub().returns(true),
          [flagType]: flagName
        });

        subject[method](flagType);

        expect(get(subject, flagName)).to.be.equal(true);
      });

      it('should set default flagName', function () {
        subject.setProperties({
          _isValidFlagName: sinon.stub().returns(false),
          [flagType]: flagName
        });

        subject[method](flagType);

        expect(get(subject, get(subject, `defaults.${flagType}`))).to.be.equal(true);
      })
    });

    describe('_isValidFlagName', function () {
      const method = this.title;

      it('should return true', function () {
        expect(subject[method]('size', 'big')).to.be.equal(true);
      });

      it('should return false', function () {
        expect(subject[method]('size', 'foo-bar')).to.be.equal(false);
      });
    });
  });
});

