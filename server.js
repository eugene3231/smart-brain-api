const express = require('express');


const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const database = {
    users: [
    {
        id: '123',
        name: 'john',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joindate: new Date()
    },
    {
        id: '124',
        name: 'bobbyb',
        email: 'bobbyb@gmail.com',
        password: 'bobby',
        entries: 0,
        joindate: new Date()
    }
]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json('success');
        }
    else {
        res.status(400).json('error logging in');
    }
    res.json('signing in')
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joindate: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.listen(3000, () => {
    console.log('app is running');
})
