import Ember from 'ember';
import openCenteredPopupWindow from 'repositive/utils/open-centered-popup-window';
import URI from 'npm:urijs';

const { Component, computed, get, setProperties, set } = Ember;

export default Component.extend({
  windowWidth: 555,
  windowHeight: 424,
  windowTitle: 'Share this dataset',
  copyAttempt: false,
  copySuccess: false,
  tweetMaxLength: 140,
  tweetURLLength: 25, // 23 for url and 2 for spaces

  copyFailed: computed('copyAttempt', 'copySuccess', function () {
    return get(this, 'copyAttempt') && get(this, 'copySuccess') === false;
  }),

  copyButtonClasses: computed('copyFailed', function() {
    return `r-btn r-btn-small r-btn-primary ${get(this, 'copyFailed') ? 'copy-failed' : ''}`;
  }),

  init() {
    this._super(...arguments);

    const twitterHashtags = ['findthatdata'];
    const twitterMsg = '!@repositiveio helped me find this awesome human #genomic #dataset - ';

    set(this, 'channels', {
      twitter: {
        baseUrl: 'https://twitter.com/intent/tweet',
        qsParams: {
          hashtags: twitterHashtags.join(),
          text: twitterMsg + this._createTweetText(
            get(this, 'model.title'),
            this._getMaxTitleLengthForTweet(twitterMsg, twitterHashtags, get(this, 'model.url'))
          )
        }
      },
      linkedin: {
        baseUrl: 'https://www.linkedin.com/shareArticle',
        qsParams: {
          mini: true,
          source: 'Repositive',
          summary: `#Repositive helped me find this awesome human #genomic #dataset - ${get(this, 'model.title')} & now I am helping you find it #findthatdata`,
          title: 'Repositive helped me find this awesome human genomic dataset'
        }
      }
    })
  },

  actions: {
    share(channel) {
      this._trackClickEvent(channel);

      openCenteredPopupWindow(
        this._createShareWindowUrl(get(this, `channels.${channel}`)),
        get(this, 'windowTitle'),
        get(this, 'windowWidth'),
        get(this, 'windowHeight')
      );
    },

    onEnvelopeClick() {
      this._trackClickEvent('email');
      get(this, 'onEnvelopeClick')();
    },

    copySuccess() {
      this._trackClickEvent('copy');
      setProperties(this, {
        copyAttempt: true,
        copySuccess: true
      });
    },

    copyError() {
      this._trackClickEvent('copy');
      setProperties(this, {
        copyAttempt: true,
        copySuccess: false
      });
    }
  },

  _trackClickEvent(action) {
    if (get(this, 'session.isAuthenticated')) {
      get(this, 'metrics').trackEvent({
        category: 'discover_homeauth_sharemodal',
        action,
        label: get(this, 'model.id')
      });
    } else {
      get(this, 'metrics').trackEvent({
        category: 'discover_openpage_sharemodal',
        action,
        label: get(this, 'model.id')
      });
    }
  },

  _createShareWindowUrl(channelOptions) {
    return new URI(get(channelOptions, 'baseUrl')).query(
      Object.assign({}, get(channelOptions, 'qsParams'), { url: get(this, 'shareUrl') })
    ).toString();
  },

  /**
   * Gets max dataset title length for tweet based on the length of other tweet parts
   * @param {String} textMgs
   * @param {Array<String>} hashtags
   * @param {String} shareUrl
   * @returns {Number}
   * @private
   */
  _getMaxTitleLengthForTweet(textMgs, hashtags, shareUrl) {
    return get(this, 'tweetMaxLength') -
      textMgs.length -
      hashtags.join('# ').length -
      shareUrl ? get(this, 'tweetURLLength') : 0;
  },

  /**
   * Returns truncated version of dataset title if it is longer then provided mux length
   * @param {String} title
   * @param {Number} maxLength
   * @returns {String}
   * @private
   */
  _createTweetText(title, maxLength) {
    return title.length <= maxLength ? title : title.slice(0, maxLength - 3) + '...';
  }
});
