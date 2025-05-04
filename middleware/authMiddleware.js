const jwt = require('jsonwebtoken');

const ensureAuth = (req,res,next) => {
    const auth = req.headers['Authorization'];
    if(!auth) {
        res.status(403).json({
            message:  "Unauthorized, token is required"
        })
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "JWT expired or incorrect"
        })
    }
};

module.exports = ensureAuth;
