var express = require('express');
var router = express.Router();
const UsersModel = require('../bin/model/users');

/* POST sign-in. */
router.post('/sign-in', function(req, res, next) {
  UsersModel.create(req.body)
    .then(signIn => res.json(signIn))
    .catch(err => res.status(500).json({ error: err.message })); 
});
/* GET users listing. */
router.post('/log-in', function(req, res, next) {
  const {email , password} = req.body;
  UsersModel.findOne({email: userValue.email})
  .then(user => {
      if(user) {
          if(user.password === userValue.password){
              res.json("Success")
          }else{
              res.json("the Password is incorrect")
          }
          
      }else{
          res.json("The User Not Found")
      }
  })
});
module.exports = router;