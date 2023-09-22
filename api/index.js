const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const localStratege = require('passport-local').Strategy

const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

mongoose.connect(
    "mongodb+srv://aayush91103:Aayush91103@chatapp.mstzkg7.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to database")
}).catch((error) => {
    console.log("Error : " + error)
})

app.listen(port, () => {
    console.log(`Connected to ${port} and ready to go`)
})