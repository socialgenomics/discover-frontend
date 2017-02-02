import Ember from 'ember';

const { Mixin } = Ember;

export default Mixin.create({
  /**
   * @desc adds message to flashMessages
   * @param {String} message
   * @param {String} type - flash message type
   * @private
   */
  _addFlashMessage(message, type) {
    this.flashMessages.add({
      message,
      type
    });
  }
});
