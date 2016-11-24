import Ember from 'ember';
import openCenteredPopupWindow from '../../utils/open-centered-popup-window';

const { Component } = Ember;

export default Component.extend({
  windowWidth: 555,
  windowHeight: 424,

  actions: {
    share() {
      // WIP TODO: introduce sharing config for both twitter and linkedin
      openCenteredPopupWindow(
        'https://www.linkedin.com/shareArticle?url=aaaaa.com&mini=true',
        this.get('Lorem ipsum'),
        this.get('windowWidth'),
        this.get('windowHeight')
      );
    }
  }
});
