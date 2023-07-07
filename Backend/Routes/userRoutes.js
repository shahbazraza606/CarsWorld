const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const user = require('../Controller/userController');
const router = express.Router();

router.post('/signup', user.user_signup);
router.post('/login', user.user_login);

module.exports = router;