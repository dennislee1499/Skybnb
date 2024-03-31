const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
require('dotenv').config();
const app = express(); 

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'vbjvb3hb3jbh2j3b2';

app.use(express.json());
app.use(cors({
    credentials: true, 
    origin: "http://localhost:5173",
}))

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body; 
    
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ user })
    } catch (error) {
        res.status(422).json(error)
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body; 

    try {
        const user = await User.findOne({email}); 
        if (user) {
            const passValid = bcrypt.compareSync(password, user.password)
            if (passValid) {
                jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (error, token) => {
                    if (error) throw error;
                    res.cookie('token', '').json('Password ok')
                })
            } else {
                res.status(422).json('Password not okay')
            }
        } else {
            res.json('not found');
        }
    } catch (error) {

    }
})

app.listen(4000)