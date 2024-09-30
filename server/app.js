const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const createHttpError = require('http-errors')
require('dotenv').config()

// initialize the server
const app = express()
const PORT = process.env.PORT || 4000

// Middlewares
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path, req.headers);
    next();
});

const StytchStrategy = require('./utils/passport.config')

// Passport configuration
passport.use(new StytchStrategy())
app.use(passport.initialize())

// Local routes
// const authRoute = require('./routes/auth')
const orgRoute = require('./routes/organization')
const deptRoute = require('./routes/department')
const deptProjectRoute = require('./routes/department/projects')
const deptProjectTaskRoute = require('./routes/department/projectTasks')
const projectRoute = require('./routes/project')
const projectTaskRoute = require('./routes/project/tasks')

// Routes
// app.use('/api/auth', authRoute)

app.use('/api/organizations', orgRoute)

app.use('/api/organizations/departments', deptRoute)
app.use('/api/organizations/departments/:deptId/projects', deptProjectRoute)

app.use('/api/organizations/departments/:deptId/projects/:projectId/tasks', deptProjectTaskRoute)


app.use('/api/organizations/projects', projectRoute)
app.use('/api/organizations/projects/:projectId/tasks', projectTaskRoute)


// app.use('api/users')

// More detailed logging middleware
// app.use((req, res, next) => {
//     console.log({
//       timestamp: new Date().toISOString(),
//       method: req.method,
//       url: req.url,
//       headers: req.headers,
//       body: req.body,
//       query: req.query,
//       params: req.params
//     });
//     next();
//   });

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

app.listen(PORT, (err) => {
    if (err) throw err
    console.log(
        `Server is Successfully Running, and App is listening on port ${PORT}`
    )
})
