// Import the required modules
const path = require("path");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
require("dotenv").config();
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const sequelize = require("./config/connection");

// Import the models
const User = require('./models/employee');
const Company = require('./models/company');
const Newsletter = require('./models/newsletter');

// Import the routes
const routes = require("./controllers");
const newsRoutes = require('./controllers/api/newsRoutes');  // Make sure to adjust the path to your newsRoutes file

// Initialize Express and define other variables
const app = express();
const PORT = process.env.PORT || 3001;

// Configure sessions
const sess = {
  secret: process.env.SESSION_PASSWORD,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Use sessions
app.use(session(sess));

// Set up Handlebars.js
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Use the API routes
app.use('/api/newsletters', newsRoutes);  // This will make your newsletter routes available under /api/newsletters

// Uncomment this if you want to use other routes as well
// app.use(routes);

// Start the server after syncing the database models
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});

