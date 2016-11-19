/* jshint expr:true */
import Ember from 'ember';
import { expect } from 'chai';
import { describeModule, it } from 'ember-mocha';

const { get } = Ember;

function createControllerMock({ didRegister }) {
  return Ember.Object.create({
    title: 'test',
    description: 'test',
    url: 'test',
    didRegister
  });
}

describeModule(
  'route:datasets/register',
  'DatasetsRegisterRoute',
  {
    needs: [
      'service:session',
      'service:metrics',
      'ember-metrics@metrics-adapter:google-analytics'
    ]
  },
  function() {
    it('resetController resets register form params', function() {
      const route = this.subject();
      const controllerMock = createControllerMock({ didRegister: true });

      route.resetController(controllerMock, true);

      expect(get(controllerMock, 'title')).to.eql(null);
      expect(get(controllerMock, 'description')).to.eql(null);
      expect(get(controllerMock, 'url')).to.eql(null);
      expect(get(controllerMock, 'didRegister')).to.eql(false);
    });

    it('resetController does not reset register form params', function() {
      const route = this.subject();
      const dataProvider = [
        {
          isExiting: true,
          controllerMock: createControllerMock({ didRegister: false })
        },
        {
          isExiting: false,
          controllerMock: createControllerMock({ didRegister: false })
        },
        {
          isExiting: false,
          controllerMock: createControllerMock({ didRegister: true })
        }
      ];

      dataProvider.forEach(dataset => {
        const controllerMock = dataset.controllerMock;
        const originalDidRegister = get(controllerMock, 'didRegister');

        route.resetController(controllerMock, dataset.isExiting);

        expect(get(controllerMock, 'title')).to.not.eql(null);
        expect(get(controllerMock, 'description')).to.not.eql(null);
        expect(get(controllerMock, 'url')).to.not.eql(null);
        expect(get(controllerMock, 'didRegister')).to.eql(originalDidRegister);
      });
    });
  }
);
