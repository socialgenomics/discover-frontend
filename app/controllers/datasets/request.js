import Ember from 'ember';
import FlashMessageMixin from 'repositive/mixins/flash-message-mixin';
import TrackEventsMixin from 'repositive/mixins/track-events-mixin';
import RequestSubmissionMixin from 'repositive/mixins/request-submission';

const { Controller } = Ember;

export default Controller.extend(
  FlashMessageMixin,
  TrackEventsMixin,
  RequestSubmissionMixin,
  {});
