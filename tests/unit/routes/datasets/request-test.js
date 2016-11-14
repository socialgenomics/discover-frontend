/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

const { get } = Ember;

function createControllerMock({ didRequest }) {
  return Ember.Object.create({
    title: 'test',
    description: 'test',
    didRequest
  });
}

describeModule(
  'route:datasets/request',
  'DatasetsRequestRoute',
  {
    needs: [
      'service:session',
      'service:metrics',
      'ember-metrics@metrics-adapter:google-analytics'
    ]
  },
  function() {
    it('resetController resets request form params', function() {
      const route = this.subject();
      const controllerMock = createControllerMock({ didRequest: true });

      route.resetController(controllerMock, true);

      expect(get(controllerMock, 'title')).to.eql(null);
      expect(get(controllerMock, 'description')).to.eql(null);
      expect(get(controllerMock, 'didRequest')).to.eql(false);
    });

    it('resetController does not reset register form params', function() {
      const route = this.subject();
      const dataProvider = [
        {
          isExiting: true,
          controllerMock: createControllerMock({ didRequest: false })
        },
        {
          isExiting: false,
          controllerMock: createControllerMock({ didRequest: false })
        },
        {
          isExiting: false,
          controllerMock: createControllerMock({ didRequest: true })
        }
      ];

      dataProvider.forEach(dataset => {
        const controllerMock = dataset.controllerMock;
        const originalDidRequest = get(controllerMock, 'didRequest');

        route.resetController(controllerMock, dataset.isExiting);

        expect(get(controllerMock, 'title')).to.not.eql(null);
        expect(get(controllerMock, 'description')).to.not.eql(null);
        expect(get(controllerMock, 'didRequest')).to.eql(originalDidRequest);
      });
    });
  }
);
