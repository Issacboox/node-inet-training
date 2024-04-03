var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('Method Post');
});

router.put('/', function(req, res, next) {
  res.send('Method Put');
});

router.delete('/', function(req, res, next) {
  res.send('Method Delete');
});

module.exports = router;
