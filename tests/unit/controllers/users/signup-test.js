/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';
import sinon from 'sinon';

const { set, setProperties, get } = Ember;

describeModule(
  'controller:users/signup',
  'UsersSignupController',
  {
    needs: [
      'service:session',
      'service:metrics'
    ]
  },
  function() {
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

    it('type is text when showPassword is true', function() {
      const controller = this.subject();
      set(controller, 'showPassword', true);
      expect(get(controller, 'type')).to.eql('text');
    });

    it('type is password when showPassword is false', function() {
      const controller = this.subject();
      set(controller, 'showPassword', false);
      expect(get(controller, 'type')).to.eql('password');
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
  }
);
