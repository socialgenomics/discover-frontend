/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupTest } from 'ember-mocha';
import sinon from 'sinon';

const { set, setProperties, get } = Ember;

describe('UsersSignupController', function() {
  setupTest('controller:users/signup', {
    needs: [
      'service:session',
      'service:metrics'
    ]
  });

  it('_displayMessage always shows a flash message error', function() {
    const controller = this.subject();
    const resp = { message: 'Example error message.' };
    set(controller, '_addFlashMessage', sinon.spy());
    controller._displayMessage(resp);
    expect(get(controller, '_addFlashMessage').calledWith('Example error message.', 'warning')).to.eql(true);
  });

  it('isDisabled is true when the form is invalid', function() {
    const controller = this.subject();
    setProperties(controller, {
      'isValid': false,
      'loading': false
    });
    expect(get(controller, 'isDisabled')).to.eql(true);
  });

  it('isDisabled is true when in loading state', function() {
    const controller = this.subject();
    setProperties(controller, {
      'isValid': true,
      'loading': true
    });
    expect(get(controller, 'isDisabled')).to.eql(true);
  });

  it('isDisabled is false when form is valid', function() {
    const controller = this.subject();
    setProperties(controller, {
      'isValid': true,
      'loading': false
    });
    expect(get(controller, 'isDisabled')).to.eql(false);
  });

  it('_buildCredentials returns object with email, pw, first and lastname', function() {
    const controller = this.subject();
    setProperties(controller, {
      'fullname': 'Test Name',
      'email': 'testemail@example.com',
      'password': 'Abcdefghi'
    });

    const credentials = controller._buildCredentials();

    expect(credentials.firstname).to.eql('Test');
    expect(credentials.lastname).to.eql('Name');
    expect(credentials.email).to.eql('testemail@example.com');
    expect(credentials.password).to.eql('Abcdefghi');
  });

  describe('_getPasswordStrength', function() {
    it('should return number equal to positive pattern matches', function () {
      const controller = this.subject();
      const patterns = [/\d/, /[A-Z]/];
      const dataProvider = [
        { password: '', strength: 0 },
        { password: 'aaaa', strength: 0 },
        { password: 'Aaaa', strength: 1 },
        { password: 'AAaa', strength: 1 },
        { password: '1aaa', strength: 1 },
        { password: '11aa', strength: 1 },
        { password: '11AA', strength: 2 }
      ];

      dataProvider.forEach(dataset => {
        expect(controller._getPasswordStrength(dataset.password, patterns)).to.be.equal(dataset.strength);
      });
    });
  });

  describe('strength computed property', function() {
    it('should be equal "weak"', function () {
      const controller = this.subject();
      set(controller, 'password', '');

      expect(get(controller, 'passwordStrength')).to.be.equal('weak');
    });

    it('should be equal "medium"', function () {
      const controller = this.subject();
      const passwords = ['aaaaaaa1', 'aaaaaaaA', 'aaaaaaa@'];

      passwords.forEach(password => {
        set(controller, 'password', password);
        expect(get(controller, 'passwordStrength')).to.be.equal('medium');
      });
    });

    it('should be equal "strong"', function () {
      const controller = this.subject();
      const passwords = ['aaaaaa1A', 'aaaaaa1@', 'aaaaaaA@'];

      passwords.forEach(password => {
        set(controller, 'password', password);
        expect(get(controller, 'passwordStrength')).to.be.equal('strong');
      });
    });
  });

  describe('password inline validator', function () {
    it('should return error', function () {
      const controller = this.subject();

      set(controller, 'password', 'aaaaaaaa');
      expect(get(controller, 'errors.password.length')).to.be.equal(1);
      expect(get(controller, 'errors.password')[0]).to.be.equal('Must include a number or capital letter.');
    });

    it('should not return error', function () {
      const controller = this.subject();
      const passwords = ['aaaaaaa1', 'aaaaaaaA', 'aaaaaaa@'];

      passwords.forEach(password => {
        set(controller, 'password', password);
        expect(get(controller, 'errors.password.length')).to.be.equal(0);
      });
    });
  });
});
