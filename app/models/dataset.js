import DS from "ember-data";

export default DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	repo: DS.attr('string'),
	date: DS.attr('string'),
	uploader: DS.attr('string'),
	accessType:DS.attr('string'),
	downloads:DS.attr('number'),
	rating:DS.attr('number'),
	comments:DS.attr('number')
});