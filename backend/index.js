const express = require('express')
const PORT = 2000

// ROTAS DA APLICAÇÃO
const registrationRoute = require('./src/routes/registration.route')
const loginRoutes = require('./src/routes/login.route')

// FIM DAS ROTAS DA APLICAÇÃO
const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/login', loginRoutes)
app.use('/registration', registrationRoute)

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`)
})
