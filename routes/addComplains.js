var express = require('express');
var router = express.Router();
const Complains = require('../bin/model/complains');

router.post('/add-complain', async function(req, res, next) {
    try {
        const complain = new Complains({
            complainTitle: req.body.complainTitle,
            email: req.body.email,
            roomNo: req.body.roomNo,
            description: req.body.description
        });
        await complain.save(); 
        res.json({ message: "Complain created successfully" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
