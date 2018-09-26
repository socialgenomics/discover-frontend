import Component from '@ember/component';
import { get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import insignia from 'npm:fairshakeinsignia';

export default Component.extend({
  attributeBindings: ['style'],
  doi: null,

  style: htmlSafe('width: 40px; height: 40px;'),

  didRender() {
    this._super(...arguments);

    const elem = get(this, 'element');
    const url = get(this, 'doi');
    insignia.build_svg_from_score(
      elem,
      { url }
    );
  }
}).reopen({
  positionalParams: ['doi']
});
