const express = require('express');

const path = require('path');
const crypto = require('crypto');
const querystring = require('querystring');

const morgan = require('morgan');

const data = require('./data.js');

const app = express();
const PORT = process.env.port || 3000;

// Use http request logger
app.use(morgan('dev'));
// Serve static files using express.static built-in middleware
app.use('/static', express.static(path.join(__dirname, 'public')));
// Use body-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set to use templates
app.set('views', './views');
app.set('view engine', 'pug');

// Display welcome message (home route)
// TODO: Research next in (rq, res, next)
app.get('/', (req, res) => res.render('pages/home', { message: 'Welcome to our schedule website', users: data.users }));

// Get list of users
app.get('/users', (req, res) => res.render('pages/users', { users: data.users }));

// Get list of schedules
app.get('/schedules', (req, res) => res.render('pages/schedules', { schedules: data.schedules, users: data.users }));

// Get user info
app.get('/users/:id(\\d+)', (req, res) => res.render('pages/user', { user: data.users[req.params.id] }));

// Get user schedules
app.get('/users/:id/schedules/', (req, res) => {
  const userSchedules = data.schedules.filter(schedule => schedule.user_id === Number(req.params.id));
  const firstname = data.users[req.params.id].firstname;
  const lastname = data.users[req.params.id].lastname;
  const user = `${firstname} ${lastname}`;
  res.render('pages/user_schedules', { userSchedules: userSchedules, user: user });
});

// Display form for new user
app.get('/users/new', (req, res) => res.render('pages/new_user', {email: req.query.email, firstname: req.query.firstname, lastname: req.query.lastname}));

// Display form for new schedule
app.get('/schedules/new', (req, res) => res.render('pages/new_schedule', { users: data.users }));

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
  // Check if email already exists in data.users
  if (data.users.some(user => user.email === req.body.email)) {
    const query = querystring.stringify({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });
    res.redirect(`/users/new?${query}`);
  } else {
    const encriptedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const newUser = {
      'firstname': req.body.firstname,
      'lastname': req.body.lastname,
      'email': req.body.email,
      'password': encriptedPassword
    };
    data.users.push(newUser);
    res.redirect('/users');
  };
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));