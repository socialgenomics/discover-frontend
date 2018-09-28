import Component from '@ember/component';
import { get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import coreapi from 'npm:coreapi';
import insignia from 'npm:fairshakeinsignia';
import schema from 'npm:fairshakeinsignia/dist/schema.js';

export default Component.extend({
  attributeBindings: ['style'],
  doi: null,

  style: htmlSafe('width: 40px; height: 40px;'),

  didRender() {
    this._super(...arguments);

    const elem = get(this, 'element');
    const url = get(this, 'doi');
    const client = new coreapi.Client();
    client.action(schema, ['score', 'list'], {url})
      .then((results) => {
        insignia.build_svg(
          elem,
          results.scores,
          {
            tooltips: (rubric, metric, score) =>
              `Score: ${(score * 100).toFixed(0)}%<br />${results.metrics[metric]}`
          }
        );
      });
  }
}).reopen({
  positionalParams: ['doi']
});
