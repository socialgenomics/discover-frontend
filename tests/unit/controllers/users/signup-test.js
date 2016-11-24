/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';
import sinon from 'sinon';

const { set, get } = Ember;

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
      let controller = this.subject();
      const resp = { message: 'Example error message.' };
      set(controller, '_addFlashMessage', sinon.spy());
      controller._displayMessage(resp);

      expect(get(controller, '_addFlashMessage').calledWith('Example error message.', 'warning')).to.eql(true);
    });
  }
);
