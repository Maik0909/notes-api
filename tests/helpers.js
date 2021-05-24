const { app, server } = require('../app.js')
const superTest = require('supertest')
const api = superTest(app)

module.exports = {
    initialNotes: [
        {
            important: true,
            content: "Aprender a subir archivos con node",
            userId: '60a93651172cda116c96901e'
        },
        {
            important: true,
            content: "Crear gustoso app",
            userId: '60a93651172cda116c96901e'
        },
        {
            important: false,
            content: "Preparar deliciosa cena",
            userId: '60a93651172cda116c96901e'
        },
        {
            important: true,
            content: "Buscar una peli",
            userId: '60a93651172cda116c96901e'
        }
    ],
    api,
    server
}