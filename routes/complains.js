var express = require('express');
var router = express.Router();
const Complains = require('../bin/model/complains')

router.post('/add-complain', async function(req, res, next) {
  try {
      const complain = new Complains({
          complainTitle: req.body.complainTitle,
          email: req.body.email,
          roomNo: req.body.roomNo,
          description: req.body.description,
           status : req.body.status
         
      });
      const savedComplain = await complain.save();     
   
      res.json({
          message: "Complain created successfully",
          complain: savedComplain, 
      });
  } catch (e) {
      res.status(500).json({ message: e.message });
  }
});

/* GET home page. */
router.get('/complain', async function(req, res, next) {
  try{
    const complains = await Complains.find()
    res.json(complains)
}
catch(e){
  res.status(500).json({message : e.message})
} 
});

/* Delete complain */
router.delete("/complain/:_id", async (req, res) => {
  try {
    const deletedComplain = await Complains.findByIdAndDelete(req.params._id);
    if (!deletedComplain) {
      return res.status(404).json({ message: "Complain not found" });
    }
    res.json({ message: "Complain deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
