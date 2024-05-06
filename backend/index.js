const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking')
const cookieParser = require('cookie-parser');
const download = require('image-downloader')
const multer = require('multer');
const fs = require('fs');

require('dotenv').config();
const app = express(); 

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'vbjvb3hb3jbh2j3b2';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
    credentials: true, 
    origin: "http://localhost:5173",
}))

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err; 
            resolve(userData);
        });
    });
}

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body; 
    
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
    const { email, password } = req.body; 

    try {
        const user = await User.findOne({email}); 
        if (user) {
            const passValid = bcrypt.compareSync(password, user.password)
            if (passValid) {
                jwt.sign({ 
                    email: user.email, 
                    id: user._id
                 }, jwtSecret, {}, (error, token) => {
                    if (error) throw error;
                    res.cookie('token', token).json(user)
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

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err; 
            const { email, firstName, _id } = await User.findById(userData.id)
            res.json({ firstName, email, _id });
        })
    } else {
        res.json(null); 
    }
})

app.post('/upload-with-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await download.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
})

app.post('/accomodations', async (req, res) => {
    const { token } = req.cookies;
    const { 
        title, address, addedPhotos, 
        description, features, rules, 
        checkIn, checkOut, maxGuests,
        price,  
    } = req.body; 

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err; 
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos:addedPhotos, 
            description, features, rules, 
            checkIn, checkOut, maxGuests, price,
        })
        res.json(placeDoc);
    });
});

app.get('/user-accomodations', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json( await Place.find({ owner:id }) )
    });
});

app.get('/accomodations/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id))
});

app.put('/accomodations', async (req, res) => {
    const { token } = req.cookies;
    const { 
        id, title, address, addedPhotos, 
        description, features, rules, 
        checkIn, checkOut, maxGuests, price,
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err; 
        const placeDoc = await Place.findById(id);

        if (userData.id === placeDoc.owner.toString()) {
            console.log({price})
            placeDoc.set ({
                title, address, photos:addedPhotos, 
                description, features, rules, 
                checkIn, checkOut, maxGuests, price,
            });
            await placeDoc.save();
            res.json('ok');
        }
    });
})

app.get('/accomodations', async (req, res) => {
    res.json(await Place.find()); 
})

const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]; 
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]; 
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
})

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const {accomodation, checkIn, checkOut, maxGuests, name, phone, price} = req.body; 
    Booking.create({
        accomodation, checkIn, checkOut, maxGuests, name, phone, price,
        user:userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    })
})


app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json( await Booking.find({ user:userData.id }).populate('accomodation') )
})

app.listen(4000)