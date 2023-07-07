const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
   let token = req.headers['token'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }
        req.user = decoded;
        next();
    }
    )



}
module.exports = {
    verifytoken
}