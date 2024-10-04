var express = require('express');
var router = express.Router();
const RoomsModel = require('../bin/model/rooms');

/* POST request to add room */
router.post('/rooms', function(req, res, next) {
   RoomsModel.create(req.body)
   .then(rooms => res.json(rooms))
   .catch(err => res.status(500).json({error: err.message}));
});

/* GET request to fetch all rooms */
router.get('/rooms', function(req, res, next) {
    RoomsModel.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(500).json({error: err.message}));
});
router.put('/rooms/:id',(req,res) => {
    let index = rooms.findIndex(obj => obj.id == req.params.id)
    rooms[index] = {...req.body , id: parseInt(req.params.id)}
})

module.exports = router;
