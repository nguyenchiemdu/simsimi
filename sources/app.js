var route = require('./routes/index')
// var bodyParser = require('body-parser')
var path = require('path');
// const cors = require('cors')
// const { baseRespond } = require('./common/functions')
let express = require('express')
let app = express()
let port = process.env.PORT || 3000
//mongoDB
// const database = require('./connect/mongodb');
const messagerConnect = require('./socket/messager');
// Connect to DB
// database.connect()

//Middleware
// app.use(cors())
messagerConnect(app, port)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.listen(port)

app.use(express.static(path.join(__dirname, 'static')));

//Router
route(app,__dirname)

// catch 404 and forward to error handler

// error handler
// app.use(function (err, req, res, next) {
//     console.log(err)
//     res.json(baseRespond(false, err))
// })
// error handler
console.log('RESTful API server started on: http://localhost:' + port)
