const express = require('express');
const data = require('./data.js');
const crypto = require('crypto');

const app = express();
const PORT = process.env.port || 3000;

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
// TODO: Or req.body???
// TODO: Check if user doesn't exist?
app.post('/schedules', (req, res) => {
    const newSchedule = {
        'user_id': Number(req.query.user_id),
        'day': Number(req.query.day),
        'start_at': req.query.start_at,
        'end_at': req.query.end_at
    };
    data.schedules.push(newSchedule);
    res.send(newSchedule);
});

// Post new user
app.post('/users', (req, res) => {
    // TODO: Research
    const encriptedPassword = crypto.createHash('sha256').update(req.query.password).digest('base64');
    console.log(encriptedPassword)
    const newUser = {
        'firstname': req.query.firstname,
        'lastname': req.query.lastname,
        'email': req.query.email,
        'password': encriptedPassword
    };
    data.users.push(newUser);
    res.send(newUser);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))