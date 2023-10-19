import express from 'express';
require('express-async-errors')
const app = express()
const cors = require('cors')
import signupController from './app/auth/signup/signup-controller'

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())

app.use('/auth/signup', signupController)

module.exports = app