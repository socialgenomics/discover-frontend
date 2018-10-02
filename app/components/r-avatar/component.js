import RAvatar from 'ui-library/components/r-avatar/component';
import { reads } from '@ember/object/computed';

export default RAvatar.extend({
  fallbackSrc: '/assets/images/avatar/dog.png',
  src: reads('imageSrc')
}).reopenClass({
  positionalParams: ['imageSrc']
});
