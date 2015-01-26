module.exports = function(app) {
  var express = require('express');
  var datasetsRouter = express.Router();

// return all datasets - list view
  var DATASETS = [
    {
      id:1,
      title:'Towards a genetic understanding of multiple myeloma',
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
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium qui eligendi nesciunt perferendis nobis veritatis, mollitia at dicta rerum, laborum magnam molestiae ipsam recusandae? Tempora molestiae libero, vel natus necessitatibus.',
        repo:'DBgap',
        date:'28/04/2014',
        uploader:'Anna Jones',
        accessType:'Public',
        downloads:455,
        rating:77,
        comments:12
      }
  ];

  datasetsRouter.get('/', function(req, res) {
    res.send({'datasets': DATASETS});
  });

  datasetsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

// detail view - return one datadet (by id)
  datasetsRouter.get('/:id', function(req, res) {
    res.send({
      'datasets': {
        id: req.params.id
      }
    });
  });

  datasetsRouter.put('/:id', function(req, res) {
    res.send({
      'datasets': {
        id: req.params.id
      }
    });
  });

  datasetsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/datasets', datasetsRouter);
};
