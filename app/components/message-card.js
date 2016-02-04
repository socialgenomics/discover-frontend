import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['heading', 'subheading', 'image', 'button', 'link', 'linkText', 'buttonRoute', 'buttonSubRoute', 'buttonAction'],

  currentUser: Ember.computed(function() {
    return this.get('session.secure.user');
  }),

  imgsrc: Ember.computed(function() {
    var image = this.get('image');
    return '/assets/images/' + image;
  })

});
