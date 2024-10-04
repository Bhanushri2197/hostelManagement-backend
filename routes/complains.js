var express = require('express');
var router = express.Router();
const Complains = require('../bin/model/complains')

/* GET home page. */
router.get('complain', async function(req, res, next) {
  try{
    const complains = await Complains.find()
    res.json(complains)
}
catch(e){
  res.status(500).json({message : e.message})
} 
});

module.exports = router;
