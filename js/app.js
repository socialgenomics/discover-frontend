App = Ember.Application.create({
	LOG_TRANSITIONS : true,
	LOG_ACTIVE_GENERATION: true
});

App.DATASETS = [{
	title:'Towards a genetic understanding of multiple myeloma',
	description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium qui eligendi nesciunt perferendis nobis veritatis, mollitia at dicta rerum, laborum magnam molestiae ipsam recusandae? Tempora molestiae libero, vel natus necessitatibus.',
	assays:['RNAseq','DNA'],
	repo:'Array Express',
	date:'23/09/2014',
	uploader:'John Smith',
	acccessType:'Public',
	downloads:307,
	rating:89,
	comments:5
},
{
	title:'Ipsum dolor sit amet, consectetur adipisicing elit.',
	description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium qui eligendi nesciunt perferendis nobis veritatis, mollitia at dicta rerum, laborum magnam molestiae ipsam recusandae? Tempora molestiae libero, vel natus necessitatibus.',
	assays:['RNAseq','DNA'],
	repo:'DBgap',
	date:'28/04/2014',
	uploader:'Anna Jones',
	acccessType:'Public',
	downloads:455,
	rating:77,
	comments:12
}];

App.DatasetsRoute = Ember.Route.extend({
	//this model function can either return an object or an array
	//in this case App.DATASETS is an array or objects.
	model: function(){
		return App.DATASETS;
	}
});