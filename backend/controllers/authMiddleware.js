const jwt = require("jsonwebtoken");
const tokenKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const authToken = req.headers['authorization'];

    if (!authToken) {
        return res.status(401).json({ message: "Es necesario el token" });
    }

    try {
       jwt.verify(authToken, tokenKey, function (err, decoded) {});
    } catch (err) {
        return res.status(401).json({ message: "No estas autorizado" });
    }

    next();
};

module.exports = { verifyToken };