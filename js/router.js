App.Router.map(function(){
	this.resource('datasets');
	//this is the ^^^ route, this ^^^^ is the url path.
	//This URL path is matched with the "contact route" and so, the contact
	//template will be rendered.
	//e.g. the URL will be localhost:8080/#/contactus
});

