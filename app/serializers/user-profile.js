import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    work: {embedded: 'always'},
    education: {embedded: 'always'}
  },
  typeForRoot: function(root){
    return 'user.profile';
  }
});
