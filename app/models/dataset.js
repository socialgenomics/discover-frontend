import DS from "ember-data";
var Dataset = DS.Model.extend({
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

Dataset.reopenClass({
	FIXTURES: [
		{
		  id:1,
	      title:'Towards a **genetic** understanding of multiple myeloma',
	      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium qui eligendi nesciunt perferendis nobis veritatis, mollitia at dicta rerum, laborum magnam molestiae ipsam recusandae? Tempora molestiae libero, vel natus necessitatibus.',
	      repo:'Array Express',
	      date:'23/09/2014',
	      uploader:'John Smith',
	      accessType:'Public',
	      downloads:307,
	      rating:89,
	      comments:5
		},
		{
	      id:2,
	      title:'Ipsum dolor sit amet, consectetur adipisicing elit.',
	      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium qui eligendi nesciunt perferendis nobis veritatis, mollitia at dicta rerum, laborum magnam molestiae ipsam recusandae? Tempora molestiae libero, vel natus necessitatibus: \n \n - blah \n - lah lala ',
	      repo:'DBgap',
	      date:'28/04/2014',
	      uploader:'Anna Jones',
	      accessType:'Public',
	      downloads:455,
	      rating:77,
	      comments:12
   	 	},
   	 	{
	      id:3,
	      title:'Ipsum dolor sit amet, consectetur adipisicing elit.',
	      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium qui eligendi nesciunt perferendis nobis veritatis, mollitia at dicta rerum, laborum magnam molestiae ipsam recusandae? Tempora molestiae libero, vel natus necessitatibus: \n \n - blah \n - lah lala ',
	      repo:'DBgap',
	      date:'28/04/2014',
	      uploader:'Anna Jones',
	      accessType:'Public',
	      downloads:455,
	      rating:77,
	      comments:12
	    },
	    {
	      id:4,
	      title:'Ipsum dolor sit amet, consectetur adipisicing elit.',
	      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium qui eligendi nesciunt perferendis nobis veritatis, mollitia at dicta rerum, laborum magnam molestiae ipsam recusandae? Tempora molestiae libero, vel natus necessitatibus: \n \n - blah \n - lah lala ',
	      repo:'DBgap',
	      date:'28/04/2014',
	      uploader:'Anna Jones',
	      accessType:'Public',
	      downloads:455,
	      rating:77,
	      comments:12
	    }
	]
});

export default Dataset;