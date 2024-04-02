const admin = require('firebase-admin');


const authenticateToken = async (req, res, next) => {
    const { authtoken } = req.headers;

    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
            console.log("Auth token is here: ", authtoken);
        } catch (e) {
            console.log(e);
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {};
    next();
};

module.exports = {
    authenticateToken,
};
