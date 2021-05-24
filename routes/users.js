const express = require('express')
const User = require('../models/User.js')
const { genToken } = require('../utils.js')
const router = express.Router()


router.route('/api/users')
    .post(async (req, res, next) => {
        const { username, name, password } = req.body

        const exists = await User.findOne({ username })

        console.log(exists, username)

        if (!exists) {

            // const hashPassword = await bcrypt.hash(password, 10)

            new User({ name, username, password })
                .save()
                .then(newUser => res.status(201).json(newUser))
                .catch(next)

        } else {
            res.status(400).json({ error: 'username must be unique' }).end()
        }


    })

router.route('/api/users/:id')
    .get((req, res, next) => {
        const { id } = req.params
        User.findById(id)
            .then(user => user ? res.json(user) : res.status(404).end())
    })



router.route('/api/users/sign-in')
    .post(async (req, res) => {
        const { username, password } = req.body

        const user = await User.findOne({ username })


        if (user && (await user.validatePassword(password)))
            res.send({
                token: genToken(user._id)
            })
        else
            res.status(401).json({ error: 'invalid username or password' })


    })


// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body
//     const exists = users.find(user => user.email == email && user.password == password)

//     if (!exists)
//         res.status(401).json({ error: 'user not found' })
//     else
//         res.json(
//             {
//                 token: jwt.sign({ email }, 'Shhhh')
//             }
//         )

// })

module.exports = router