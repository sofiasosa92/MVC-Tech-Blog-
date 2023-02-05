//Tech Blog server

const path = require('path');
const express = require('express');
require('dotenv').config();
//Routes in the controllers folder
const routes = require('./controllers');
//Sequelize routes
const sequelize = require('./config/connection');
//Handlebars
const exphbs = require('express-handlebars');
//Express session
const session = require('express-session');
//Sequelize store to store session data (user logged in)
const SequelizeStore = require('connect-session-sequelize')(session.Store);
//Handlebars helpers
const helpers = require('./utils/helpers');


const hbs = exphbs.create({ helpers });

//Start sessions
const sess = {
    // secret: process.env.,
    // cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

//Start the server
const app = express();
//Set the port for server
const PORT = process.env.PORT || 3001;


//Handlebars engine for server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Express parsing for JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

//Use sessions
app.use(session(sess));

//path to use routes
app.use(routes);

//Connection to database and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening!'));
});