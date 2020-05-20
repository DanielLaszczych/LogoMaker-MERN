var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', (req, res) => {
  console.log('getting user data!');
  res.send('hi');
});

module.exports = router;
