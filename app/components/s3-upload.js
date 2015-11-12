import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({

  url: "/api/sign",

  filesDidChange: (function() {
    let uploadUrl = this.get('url'),
        files = this.get('files'),
        uploader = EmberUploader.S3Uploader.create({
          url: uploadUrl
        });

    if(!Ember.isEmpty(files))
      uploader.upload(files[0]);

  }).observes('files')
});
