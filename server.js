const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

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

app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) =>{ register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id',(req, res) =>{ profile.handleProfile(req, res, db) })
app.put('/image', (req, res) =>{ image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) =>{ image.handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is running');
})