var express = require('express');
var router = express.Router();
const UsersModel = require('../bin/model/users');

/* POST sign-in. */
router.post('/sign-in', function(req, res, next) {
  UsersModel.create(req.body)
    .then(signIn => res.json(signIn))
    .catch(err => res.status(500).json({ error: err.message })); 
});

module.exports = router;