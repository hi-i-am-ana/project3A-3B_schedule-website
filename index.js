const express = require('express');
const crypto = require('crypto');
const path = require('path');
const morgan = require('morgan');

const data = require('./data.js');

const app = express();
const PORT = process.env.port || 3000;

// Use http request logger
app.use(morgan('dev'));
// Serve static files using express.static built-in middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
// TODO: Reserch express documentation http://expressjs.com/en/4x/api.html#req.body, http://expressjs.com/en/4x/api.html#app.use
// Use body-parsing middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set to use templates
app.set('views', './views');
app.set('view engine', 'pug');

// Display welcome message (home route)
// TODO: Research next in (rq, res, next)
app.get('/', (req, res) => res.render('content_home', { message: 'Welcome to our schedule website', users: data.users }));

// Get list of users
app.get('/users', (req, res) => res.render('content_users', { users: data.users }));

// Get list of schedules
app.get('/schedules', (req, res) => res.render('content_schedules', { schedules: data.schedules, users: data.users }));

// Get user info
// TODO: Check if user exists
app.get('/users/:id(\\d+)', (req, res) => res.render('content_user', { user: data.users[req.params.id] }));

// Get user schedules
// TODO: Check if user exists
app.get('/users/:id/schedules/', (req, res) => {
  const userSchedules = data.schedules.filter(schedule => schedule.user_id === Number(req.params.id));
  const firstname = data.users[req.params.id].firstname;
  const lastname = data.users[req.params.id].lastname;
  const user = `${firstname} ${lastname}`;
  res.render('content_user_schedules', { userSchedules: userSchedules, user: user });
});

// Display form for new user
app.get('/users/new', (req, res) => res.render('content_new_user'));

// Display form for new schedule
app.get('/schedules/new', (req, res) => res.render('content_new_schedule', { users: data.users }));

// Post new schedule
app.post('/schedules', (req, res) => {
  const newSchedule = {
    'user_id': Number(req.body.user_id),
    'day': Number(req.body.day),
    'start_at': req.body.start_at,
    'end_at': req.body.end_at
  };
  data.schedules.push(newSchedule);
  res.redirect('/schedules');
});

// Post new user
app.post('/users', (req, res) => {
  // TODO: Check if email already exists in data.users
  // if (data.users.some(user => user.email === req.body.email)) {
  //   res.render('content_new_user')
  // }
  // TODO: Research https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
  const encriptedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
  const newUser = {
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'email': req.body.email,
    'password': encriptedPassword
  };
  data.users.push(newUser);
  res.redirect('/users');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))