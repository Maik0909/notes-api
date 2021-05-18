import express from 'express'
import session from 'express-session'
import cors from 'cors'
import jwt from 'express-jwt'
import jsonWebToken from 'jsonwebtoken'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

let API = [
  {
    id: 1,
    content: 'Leer Nudge',
    important: true
  },
  {
    id: 2,
    content: 'Aprender Mongo db',
    important: true

  }, {
    id: 3,
    content: 'Aprende Node js',
    important: true

  }, {
    id: 4,
    content: 'Ver peli con mi bella novia',
    important: true

  }
]

const users = [
  { name: 'Maiko', email: 'maiko@gmail.com', password: 123 },
  { name: 'Machela', email: 'machela@gmail.com', password: 123 },
]


app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  console.log(req.body)
  const exists = users.find(user => user.email == email && user.password == password)

  if (!exists)
    res.status(401).json({ error: 'user not found' })
  else
    res.json(
      {
        token: jsonWebToken.sign({ email }, 'Shh')
      }
    )

})

app.get('/api/notes', (req, res) => {
  const condition = req.query.important

  if (condition) { return res.json(API.filter(note => note.important === JSON.parse(condition))) }

  res.json(API)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  API = API.filter(note => note.id !== id)
  res.status(204).end()
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = API.find(note => note.id === id)

  if (note) { res.json(note) } else { res.status(404) }

  res.end()
})

// app.post('/api/login', (req, res) => {
//   console.log(req.session)
//   req.session.userId = true
//   console.log(req.session.cookie)
//   console.log(req.session.userId)
//   // res.send('Login Page')
//   res.end()
// })

app.post('/api/notes', (req, res) => {
  const note = req.body
  const ids = API.map(note => note.id)
  const id = Math.max(...ids) + 1

  console.log(note)

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'Se debe incluir un contenido'
    }).end()
  }
  const newNote = {
    id,
    content: note.content,
    important: note.important === undefined ? false : note.important,
    date: new Date().toISOString()
  }

  API = API.concat(newNote)

  res.status(201).json(newNote)
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))
