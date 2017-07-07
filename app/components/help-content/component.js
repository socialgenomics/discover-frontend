import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['mb4', 'px4'],

  didRender() {
    this._super(...arguments);
    this._scrollToContent();
  },

  /**
   * @desc scrolls to the help content
   * @private
   */
  _scrollToContent() {
    const DESKTOP_MIN_WIDTH = 1009;
    const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    if (viewportWidth < DESKTOP_MIN_WIDTH) {
      const linkItems = document.getElementsByClassName('c-vertical-menu-link-item');
      const lastLinkItem = linkItems[linkItems.length - 1];
      if (lastLinkItem) { lastLinkItem.scrollIntoView(); }
    }
  }
});
