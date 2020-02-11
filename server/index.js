require("dotenv").config()
const express = require("express");
const session = require('express-session');
const Auth = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');
const app = express();

const {SERVER_PORT, SESSION_SECRET} = process.env;

app.use (express.json());

app.use(session({
    secret: 'Yarrum Nomma',
    resave: true,
    saveUninitialized: true,
    
}));

app.use(Auth);

app.use((req, res, next) => {
    console.log('Server Hit!');
    next();
});
// Auth Endpoints
app.post('/api/register', authController.register)
app.post('/api/login', authController.login)
app.post('/api/signout', authController.logout)

app.get('/api/user', authController.getUser)

// Swag Endpoints
app.get('/api/swag', swagController.read)

// Cart Endpoints
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

// Search Endpoints
app.get('/api/search', searchController.search)


app.listen(SERVER_PORT, () => 
console.log(`You are on SERVER PORT ${SERVER_PORT}`))