require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcryptjs = require('bcryptjs');

const Helpers = require('./auth/Helpers.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    Helpers.findAllUsers()
    .then(response =>{
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.post('/api/register', (req, res) => {
    let user = req.body;

    const hashedpass = bcryptjs.hashSync(user.password, 12);
    user.password = hashedpass;
    
    Helpers.addUser(user)
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.post('/login', (req, res) => {
    let { username, password } = req.body;

    Helpers.findUserBy({ username })
    .first()
    .then(user => {
        if( user && bcryptjs.compareSync(password, user.password)){
            res.status(200).json({ message: 'Welcome..' })
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

server.get('/familyList', (req, res) => {
    Helpers.findAllFamilyMembers()
    .then(response =>{
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.post('/addperson', (req, res) => {
    Helpers.addFamilyMember(req.body)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

const PORT = process.env.PORT || 5000;

// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(PORT, () => console.log(`API running on port ${PORT}`));
