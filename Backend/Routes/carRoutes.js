const express = require('express');
const router = express.Router();
const upload = require('../Controller/multerconfig.js');
const auth = require('../Middleware/auth.js');
const carController = require('../Controller/carController.js');


router.post('/upload',auth.verifytoken, upload.single('image'), carController.createcar);
router.get("/getcar",auth.verifytoken,carController.getcars);
router.get('/getcarbyid/:id',auth.verifytoken, carController.getcarbyid);
router.delete('/deletecar/:id',auth.verifytoken, carController.deletecar);
router.put('/updatecar/:id',auth.verifytoken,upload.single('image'), carController.updatecar);
router.get('/findcar/:name',carController.findcar)
module.exports = router;
