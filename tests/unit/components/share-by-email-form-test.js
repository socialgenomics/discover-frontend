/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { setupComponentTest } from 'ember-mocha';

const { setProperties, get, set } = Ember;

describe('ShareByEmailFormComponent', function() {
  setupComponentTest('share-by-email-form', {
    unit: true,
    needs: [
      'validator:presence',
      'validator:format',
      'service:ajax'
    ]
  });

  it('submitDisabled returns correct value', function() {
    const component = this.subject();
    const dataProvider = [
      {
        isLoading: true,
        emailAddress: '',
        disabled: true
      },
      {
        isLoading: false,
        emailAddress: '',
        disabled: true

      },
      {
        isLoading: true,
        emailAddress: 'aaa@aaa.aa',
        disabled: true
      },
      {
        isLoading: false,
        emailAddress: 'aaa@aaa.aa',
        disabled: false
      }
    ];

    dataProvider.forEach(testCase => {
      set(component, 'isLoading', testCase.isLoading);
      set(component, 'emailAddress', testCase.emailAddress);

      expect(get(component, 'submitDisabled')).to.eql(testCase.disabled);
    });
  });

  it('submitButtonLabel returns correct value', function() {
    const component = this.subject();
    const dataProvider = [
      {
        isLoading: true,
        sendSuccess: false,
        sendError: false,
        label: 'Sending the email...'
      },
      {
        isLoading: false,
        sendSuccess: true,
        sendError: false,
        label: 'Back to dataset'

      },
      {
        isLoading: false,
        sendSuccess: false,
        sendError: true,
        label: 'Try again later'

      },
      {
        isLoading: false,
        sendSuccess: false,
        sendError: false,
        label: 'Send the Email'
      }
    ];

    dataProvider.forEach(testCase => {
      setProperties(component, {
        isLoading: testCase.isLoading,
        sendSuccess: testCase.sendSuccess,
        sendError: testCase.sendError
      });

      expect(get(component, 'submitButtonLabel')).to.eql(testCase.label);
    });
  });
});
