const express = require('express');
const app = express();
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENTID,
  issuerBaseURL: process.env.AUTH0_ISSUERBASEURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    if (process.env.NODE_ENV==='development') {
        res.redirect('http://localhost:3000');
    } else {
        res.status(403).send()
    }
});

// req.isAuthenticated is provided from the auth router
app.get('/me', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(JSON.stringify(req.oidc.user, null, 2));
    } else {
        res.status(403).send()
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
  })