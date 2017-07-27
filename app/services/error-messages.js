import Ember from 'ember';

const { Service, inject: { service }, get } = Ember;

export default Service.extend({
  i18n: service(),

  // TODO unit test
  // TODO generalize to allow for multiple errors
  /**
   * @desc Builds an error message using i18n
   * @param {string} context Name of current context e.g. dataset
   * @param {Object} errorResp The error response
   * @return {string} User-friendly error message
   */
  buildErrorMessage(context, errorResp) {
    const i18n = get(this, 'i18n');
    const errorPath = this._getErrorPath(context, errorResp);

    return 'props' in errorResp ?
      i18n.t(errorPath, errorResp.props) : i18n.t(errorPath)
  },

  /**
   * @desc Gets the dot notation path to the error string
   * @param {string} context Name of current context e.g. dataset
   * @param {Object} errorResp The error response
   * @return {string} Dot notation path to the error message string
   */
  _getErrorPath(context, errorResp) {
    const errorCategory = errorResp.category;

    if ('props' in errorResp) {
      const invalidObjKey = Object.keys(errorResp.props)[0];
      const invalidObj = get(errorResp, `props.${invalidObjKey}`);
      const errorKey = Object.keys(invalidObj)[0];

      return `${context}.${errorCategory}.${invalidObjKey}.${errorKey}`;
    }

    return `${context}.${errorCategory}.default` || this._getCategoryString(errorCategory);
  },

  /**
   * @desc Maps a category name to it's user-friendly string.
   * @param {string} category The category name.
   * @return {string} User-friendly string.
   */
  _getCategoryString(category) {
    const categoryList = {
      'invalid-syntax': 'Please check that the information you have entered is correct.'
    }
    return categoryList[category];
  }
});
