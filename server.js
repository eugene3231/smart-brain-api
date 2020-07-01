const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '0',
      database : 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
    users: [
    {
        id: '123',
        name: 'john',
        password: 'cookies',
        email: 'john@gmail.com',
        entries: 0,
        joindate: new Date()
    },
    {
        id: '124',
        name: 'bobbyb',
        password: 'bobby',
        email: 'bobbyb@gmail.com',
        entries: 0,
        joindate: new Date()
    }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
           res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    db('users')
    .returning('*')
    .insert({
        email:email,
        name: name,
        joined: new Date(),
    })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register!'))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    if (!found) {
        res.status(400).json('not found!');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if (!found) {
        res.status(400).json('not found!');
    }
})

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

app.listen(3000, () => {
    console.log('app is running');
})
