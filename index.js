//to run the app with nodemon, type 'npm run dev'
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const now = new Date()
  response.send(
    `<p>Phonebook has info on ${persons.length + 1} people</p><p>${now}</p>`
  )
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const entry = persons.find((e) => e.id === id)
  if (entry) {
    response.json(entry)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const newPersons = persons.filter((person) => person.id !== id)
  if (newPersons.length < persons.length) {
    persons = newPersons
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const data = request.body
  const duplicate = Boolean(persons.find((p) => p.name === data.name))

  if (!duplicate && data.name && data.number) {
    const person = {
      id: Math.floor(Math.random() * 1000000),
      name: data.name,
      number: data.number,
    }
    persons = [...persons, person]
    response.json(person)
  } else {
    !data.name && response.status(400).json({ error: 'name is missing' })
    !data.number && response.status(400).json({ error: 'number is missing' })
    duplicate && response.status(400).json({ error: 'name must be unique' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
