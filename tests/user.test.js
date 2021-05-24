const User = require('../models/User')
const { api } = require('./helpers')

const user = {
    username: 'carnage',
    name: 'Cletus Kasady',
    password: 'badass'
}

beforeEach(async () => {
    await User.deleteMany({})
    await new User(user).save()

})

test('It should throw an error if user already exists', async () => {
    const result = await api.post('/api/users')
        .send(user)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')
})