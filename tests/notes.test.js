const mongoose = require('mongoose')
const Note = require('../models/Note.js')
const { initialNotes, api, server } = require('./helpers.js')


beforeEach(async () => {

    await Note.deleteMany({})

    await Note.insertMany(initialNotes)

})

test('notes are return as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /json/)
})


test('there is four notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(4)
})

test('note without correct id cannot be deleted', async () => {
    await api
        .delete('/api/notes/bad1d')
        .expect(400)
})

test('fist note content', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(({ content }) => content)

    expect(contents).toContain('Crear gustoso app')
    // expect(response.body[0].content).toBe('Aprender a subir archivos con node')
})


test('valid note is added', async () => {
    const newNote = {
        content: "hacer testing del backend",
        important: true
    }
    api.post('/api/notes')
        .send(newNote)
        .expect(201)
})

afterAll(() => {
    server.close()
    mongoose.disconnect()
})