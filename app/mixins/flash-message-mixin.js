import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  /**
   * @desc adds message to flashMessages
   * @param {String} message
   * @param {String} type - flash message type
   * @private
   */
  addFlashMessage(message, type) {
    this.flashMessages.add({
      message,
      type,
      timeout: 7000,
      class: 'fadeInOut'
    });
  }
});
