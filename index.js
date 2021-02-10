const express = require('express');
const data = require('./data.js');
const crypto = require('crypto');

const app = express();
const PORT = process.env.port || 3000;

// Step 2 : Create the first routes to return all the information
// Welcome message
// TODO: Research (next)
app.get('/', (req, res, next) => res.send('Welcome to our schedule website'));

// Get list of users
app.get('/users', (req, res, next) => res.send(data.users));

// Get list of schedules
app.get('/schedules', (req, res, next) => res.send(data.schedules));

// Step 3 : Create parameterized routes
// TODO: Do we need to send status also?
// Get user info
app.get('/users/:id', (req, res, next) => res.send(data.users[req.params.id]))

// Get user schedules
app.get('/users/:id/schedules/', (req, res, next) => {
    const userSchedule = data.schedules.filter(schedule => schedule['user_id'] === Number(req.params.id));
    res.send(userSchedule);
});

// Step 4 : Create routes to post data
// Post new schedule
// TODO: Or req.body???
// TODO: Check if user doesn't exist?
app.post('/schedules', (req, res, next) => {
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
app.post('/users', (req, res, next) => {
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