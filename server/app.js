const express = require('express'); 
const createHttpError = require ('http-errors');
require('dotenv/config');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan')
// const connectDB = require('./config/database');
// const { passportConfig } = require('./config/passport-config');
// const { stytchClient } = require('./config/stytch-config');
// const { authenticateStytchSession } = require('./middleware/auth'); 

// Local routes 
const authRoute = require('./routes/auth.route');
const orgRoutes = require('./routes/org.route');
const projectRoutes = require('./routes/project.route');
const tasksRoutes = require('./routes/tasks.route');
const userRoutes = require('./routes/user.route');

// initialize the server
const app = express();

// Middlewares 
app.use(morgan('dev'))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize()); 


// Routes
app.get('/', (req, res) => {
	res.send('Hello from the root path!');
});  
app.use('/auth', authRoute); 
// app.use('/org', orgRoutes); 
// app.use('/projects', projectRoutes); 
// app.use('/tasks', tasksRoutes); 
// app.use('/user', userRoutes);


//error handlers
app.use((req, res, next) => {
    next(createHttpError.NotFound());
});
app.use((err, req, res, next) => {
    err.status = err.status || 500;
	console.error(err.stack); 
	const message = err.message || "Internal Server Error";
    res.status(err.status).json({ error: message });
});

// Server Listen Along with Database 
const PORT = process.env.PORT || 3000; 
//connect mongoose and mongodb
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log('Connected to MongoDB');
	app.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`Server is Successfully Running, and App is listening on port ${PORT}`)
	})
}).catch((err) => console.log(err.message))


