const bodyParser = require('body-parser')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const createHttpError = require('http-errors')
const cors = require('cors')
require('dotenv/config')
const morgan = require('morgan')

// initialize the server
const app = express()
app.use(
    cors({
        origin: process.env.APP_URL, // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
    })
)
app.options('*', cors())

// Middlewares
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
// app.use(passport.initialize());
// Session management.
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: 'session-signing-secret',
        cookie: { maxAge: 60000 },
    })
)
app.use(bodyParser.json())
app.use(express.json())
// app.use((req, res, next) => {
//     console.log('Incoming request:', req.method, req.path, req.headers);
//     next();
// });
//middlewares
// const authenticateStytchSessionJwt = require('./middleware/auth.middleware')

// Local routes
const authRoute = require('./routes/auth')
const orgRoute = require('./routes/organization')
const deptRoute = require('./routes/department')


// Routes
app.get('/', (req, res) => {
    res.send('Hello from the root path!')
})
app.use('/api/auth', authRoute)
app.use('/api/organizations', orgRoute)
app.use('/api/organizations/departments', deptRoute)


//error handlers
app.use((req, res, next) => {
    next(createHttpError.NotFound())
})
app.use((err, req, res, next) => {
    err.status = err.status || 500
    console.error(err.stack)
    const message = err.message || 'Internal Server Error'
    res.status(err.status).json({ error: message })
})

// Server Listen Along with Database
const PORT = process.env.PORT || 4000
app.listen(PORT, (err) => {
    if (err) throw err
    console.log(
        `Server is Successfully Running, and App is listening on port ${PORT}`
    )
})
