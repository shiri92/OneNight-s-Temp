
/* ----- DEPENDENCIES -----*/
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express();

/* ----- ROUTES -----*/
const addUserRoutes = require('./routes/userRoutes')

/* ----- SERVER -----*/

app.use(cors({ /* ----- FOR GITHUB -----*/
    origin: ['http://localhost:8080'],
    credentials: true // enable set cookie
}));
// app.use(express.static('public')); /* ----- FOR HEROKU -----*/
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.get('/', (req, res) => res.send('Hello World!'))

addUserRoutes(app)
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => { })