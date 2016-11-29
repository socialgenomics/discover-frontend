import Ember from 'ember';
import openCenteredPopupWindow from '../../utils/open-centered-popup-window';

const { Component, computed, get } = Ember;

export default Component.extend({
  windowWidth: 555,
  windowHeight: 424,
  windowTitle: 'Share this dataset',

  // TODO: set proper data for sharing
  channels: {
    twitter: {
      baseUrl: 'https://twitter.com/intent/tweet',
      qsParams: {
        hashtags: 'findthatdata',
        text: '@repositiveio helped me find this awesome human #genomic #dataset & now I am helping you find it',
      }
    },
    linkedin: {
      baseUrl: 'https://www.linkedin.com/shareArticle',
      qsParams: {
        mini: true,
        source: 'Repositive',
        summary: '#Repositive helped me find this awesome human #genomic #dataset & now I am helping you find it #findthatdata',
        title: 'Repositive helped me find this awesome human genomic dataset'
      }
    }
  },

  shareUrl: computed(function() {
    return window.location;
  }),

  actions: {
    share(channel) {
      openCenteredPopupWindow(
        this._createShareWindowUrl(get(this, `channels.${channel}`)),
        get(this, 'windowTitle'),
        get(this, 'windowWidth'),
        get(this, 'windowHeight')
      );
    }
  },

  _createShareWindowUrl(channelOptions) {
    return new window.URI(get(channelOptions, 'baseUrl')).query(
      Object.assign({}, get(channelOptions, 'qsParams'), { url: get(this, 'shareUrl') })
    ).toString();
  }
});
