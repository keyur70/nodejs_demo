const jwt = require('jsonwebtoken');
const User = require('../model/user_model')

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, 'keyur', (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })
        }
        const { id } = payload
        User.findById(id)
            .then(userdata => {
                req.user = userdata
                console.log(req.user);
                next();
            })
    })     
}