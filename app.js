const express = require('express');
const hbs = require('express-handlebars')
const multer = require('multer')
const path = require('path')
const app = express()
const morgan = require('morgan')

// app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './public')));
app.use('/upload', express.static(path.join(__dirname + '/upload')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.engine('hbs', hbs({
    defaultLayout: 'main', extname: 'hbs'
}))
app.set('view engine', 'hbs')


// set route
app.use('/', require('./route/index'))

const port = 3000
app.listen(port, () => {
    console.log(`this server is running on port ${port}`);
})