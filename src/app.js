const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config/config')
const routes = require('./routes/')
const mongoose = require('mongoose')
const Bing = require('node-bing-api')({accKey:'8da440816a394e02857c6b39ccb50f11'})

const app = express()
routes(app)

app
    .set("views", __dirname + "/views")
    .set("view engine", "hjs")
    .use(bodyParser.json())
    .use(cors())

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/SearchTerms')

app.listen(config.port)