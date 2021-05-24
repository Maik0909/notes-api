const express = require('express')
const Note = require('../models/Note.js')
const User = require('../models/User.js')
const { verifyToken } = require('../utils')
const router = express.Router()

router.route('/api/notes')
    .get((_, res) => Note.find({}).populate('user', { name: true, username: true }).then(notes => res.json(notes)))
    .post(async (req, res, next) => {

        const { content, important = false } = req.body



        if (!content)
            return res.status(400).json({
                error: 'Se debe incluir un contenido'
            }).end()

        let token = null
        let decodedToken = null
        const authorization = req.get('authorization')

        if (authorization && authorization.startsWith('Bearer')) {

            try {
                token = authorization.substring(7)
                decodedToken = verifyToken(token)
                const { _id: userId } = decodedToken

                if (!token || !userId) return res.status(401).json({ error: 'invalid token' })

                const user = await User.findById(userId)

                if (!user) throw new Error('User not found')

                new Note({
                    content: content,
                    important: important,
                    user: userId

                }).save().then(async note => {
                    user.notes.push(note)
                    await user.save()
                    res.status(201).json(note).end()
                }).catch(next)

            } catch (error) {
                next(error)
            }

        }

    })

router.route('/api/notes/:id')
    .get((req, res, next) => {

        Note.findById(req.params.id)
            .then(note => {
                if (note)
                    res.json(note).end()
                else
                    res.status(404).end()
            })
            .catch(error => next(error))

    })
    .delete((req, res, next) => {
        const { id } = req.params.id

        Note.findByIdAndDelete(id)
            .then(query => !query ? res.status(400).end() : res.status(204).end())

    })
    .patch((req, res, next) => {
        const { id } = req.params
        const note = req.body

        Note.findOneAndUpdate(id, {
            content: note.content,
            important: note.important
        }, { new: true })
            .then(result => res.json(result).end())
            .catch(next)
    })


module.exports = router