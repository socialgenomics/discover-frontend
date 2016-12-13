import Ember from 'ember';
import openCenteredPopupWindow from '../../utils/open-centered-popup-window';

const { Component, computed, get, setProperties } = Ember;

export default Component.extend({
  windowWidth: 555,
  windowHeight: 424,
  windowTitle: 'Share this dataset',
  copyAttempt: false,
  copySuccess: false,

  channels: {
    twitter: {
      baseUrl: 'https://twitter.com/intent/tweet',
      qsParams: {
        hashtags: 'findthatdata',
        text: '@repositiveio helped me find this awesome human #genomic #dataset & now I am helping you find it'
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

  copyFailed: computed('copyAttempt', 'copySuccess', function () {
    return get(this, 'copyAttempt') && get(this, 'copySuccess') === false;
  }),

  copyButtonClasses: computed('copyFailed', function() {
    return `btn-flat ${get(this, 'copyFailed') ? 'copy-failed' : ''}`;
  }),

  actions: {
    share(channel) {
      openCenteredPopupWindow(
        this._createShareWindowUrl(get(this, `channels.${channel}`)),
        get(this, 'windowTitle'),
        get(this, 'windowWidth'),
        get(this, 'windowHeight')
      );
    },

    copySuccess() {
      setProperties(this, {
        copyAttempt: true,
        copySuccess: true
      });
    },

    copyError() {
      setProperties(this, {
        copyAttempt: true,
        copySuccess: false
      });
    }
  },

  _createShareWindowUrl(channelOptions) {
    return new window.URI(get(channelOptions, 'baseUrl')).query(
      Object.assign({}, get(channelOptions, 'qsParams'), { url: get(this, 'shareUrl') })
    ).toString();
  }
});
