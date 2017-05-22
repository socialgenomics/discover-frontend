import Ember from 'ember';
import ENV from 'repositive/config/environment';
import FlashMessageMixin from './flash-message-mixin';

const { get, Mixin, inject: { service }, Logger } = Ember;

export default Mixin.create(FlashMessageMixin, {
  ajax: service(),

  /**
   * @desc Makes call to send verification email to the email param
   * @param email
   * @private
   */
  _sendVerificationEmail(email) {
    return get(this, 'ajax')
      .request(ENV.APIRoutes['verify-email-resend'] + `/${email}`, { method: 'GET' })
      .then(this._onSendSuccess.bind(this))
      .catch(this._onSendError.bind(this));
  },

  /**
   * @desc Makes the current credential primary based on the token in the header
   * @private
   */
  _makeCurrentEmailPrimary() {
    return get(this, 'ajax')
      .request(ENV.APIRoutes['make-primary'], { method: 'GET' });
  },

  /**
   * @desc send email success handler
   * @private
   */
  _onSendSuccess() {
    this._addFlashMessage('We have sent a verification email to your inbox', 'success');
  },

  /**
   * @desc send email error handler
   * @private
   */
  _onSendError(err) {
    Logger.error(err);
    this._addFlashMessage('Sorry, we couldn\'t send you the link. Please try again later.', 'warning');
  }
});
