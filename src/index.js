const express = require('express')
const app = express()
const port = 3000
const morgan = require('morgan')
const {engine} = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const db = require('./config/db/index');
const route = require('./routes/index');

// Connect to db
db.connect()

// everything on log
app.use(morgan('combined'))

// Template engine
app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Setup middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));

// Override methods
app.use(methodOverride('_method'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
