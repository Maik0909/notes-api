const jwt = require('jsonwebtoken')

const genToken = (id) => {

    require('dotenv').config()
    console.log('password!', process.env.JWT_SECRET)
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        algorithm: 'HS512',
        expiresIn: '30d',
    })
}

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET)


module.exports = {
    genToken,
    verifyToken
}