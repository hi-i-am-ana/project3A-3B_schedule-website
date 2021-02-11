const express = require('express');
const data = require('./data.js');
const crypto = require('crypto');

const app = express();
const PORT = process.env.port || 3000;

// TODO: From express documentation (http://expressjs.com/en/4x/api.html#req.body) - research
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Settings to use templates
app.set('views', './views');
app.set('view engine', 'pug');

// Display welcome message (home route)
// TODO: Research (next)
app.get('/', (req, res) => res.render('content_message', {message: 'Welcome to our schedule website'}));

// Get list of users
app.get('/users', (req, res) => res.render('content_users', {users: data.users}));

// Get list of schedules
app.get('/schedules', (req, res) => res.render('content_schedules', {schedules: data.schedules}));

// TODO: Do we need to send status also?
// Get user info
// TODO: check that user exist
app.get('/users/:id(\\d+)', (req, res) => res.render('content_user', {user: data.users[req.params.id]}));

// Get user schedules
// TODO: check that user exist
app.get('/users/:id/schedules/', (req, res) => {
    const userSchedules = data.schedules.filter(schedule => schedule['user_id'] === Number(req.params.id));
    res.render('content_user_schedules', {userSchedules: userSchedules});
});

// Display form for new user
app.get('/users/new', (req, res) => res.render('content_new_user'));

// Display form for new schedule
app.get('/schedules/new', (req, res) => res.render('content_new_schedule', {users: data.users}));

// Post new schedule
// TODO: Check if user doesn't exist?
app.post('/schedules', (req, res) => {
    const newSchedule = {
        'user_id': Number(req.body.user_id),
        'day': Number(req.body.day),
        'start_at': req.body.start_at,
        'end_at': req.body.end_at
    };
    data.schedules.push(newSchedule);
    res.render('content_schedules', {schedules: data.schedules});
});

// Post new user
app.post('/users', (req, res) => {
    // TODO: Research https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
    const encriptedPassword = crypto.createHash('sha256').update(req.body.password).digest('base64');
    const newUser = {
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'password': encriptedPassword
    };
    data.users.push(newUser);
    res.render('content_users', {users: data.users});
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))