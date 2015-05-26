import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  typeForRoot: function(root){
    return 'user-profile';
  },
});
