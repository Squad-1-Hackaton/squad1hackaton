const express = require('express')
const { PrismaClient } = require('@prisma/client')
const connectPgSimple = require('connect-pg-simple')
const session = require('express-session')
const app = express()
app.use(express.json())

const store = new (connectPgSimple(session))({ createTableIfMissing: true })

app.use(
  session({
    store: store,
    secret: 'myscecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: false,
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

app.get('/', (req, res) => res.send('API Running...'))
// app.use("/user", require("./routes/user"));
app.use('/auth', require('./routes/auth'))
app.use('/post', require('./routes/post'))

app.listen(8000, () => {
  console.log('-------------------------')
  console.log('Listening on PORT:5000...')
  console.log('-------------------------')
})
