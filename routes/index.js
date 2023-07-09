var express = require('express');
var router = express.Router();
const backend = require('../recipeBackend');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET for recipe
router.get('/recipe/:food', function(req, res) {
  let target = req.params.food;
  let response = backend.searchByName(target);
  res.send(response);
});

router.post("/recipe/", function(req, res) {
  let response = backend.addRecipe(req.body.name, req.body.instructions, req.body.ingredients);
  res.send(response);
});

router.post("/images", function(req, res) {
  //Requires parser to process data
  //var form = new multiparty.Form();
  //let response = backend.addImages(req.body);
  res.send('Hi');
});

module.exports = router;
