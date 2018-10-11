import RAvatar from 'ui-library/components/r-avatar/component';
import { get, set } from '@ember/object';
import { observer } from '@ember/object';

export default RAvatar.extend({
  fallbackSrc: '/assets/images/avatar/dog.png',
  checkImage: observer('imageSrc', function () {
    const imageSrc = get(this, 'imageSrc');
    set(this, 'src', imageSrc);
  }),
  init() {
    set(this, 'src', get(this, 'imageSrc'));
    this._super(...arguments);
  }
}).reopenClass({
  positionalParams: ['imageSrc']
});
