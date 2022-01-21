const mongoose = require('mongoose');
const User = mongoose.model('users');
const authController = require('../controllers/authController');
const keys = require('../Config/keys');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utilities/catchAsync');


module.exports = app => {

    app.get('/', (req, res) => {
        console.log('react333')
        res.json({message: 'Hello World!'});
    });

    // app.get('/api/login', (req, res) => {
    //     res.send('login');

    // });


    app.post('/api/signup', (req, res) => {
        console.log(req.body);

        if(!req.body.username || !req.body.password || !req.body.email){
            return res.send({ success: false, message: 'username and/or email and/or password required'});
        }
        else {
                User.findOne ({ email: req.body.email }, 
                    function(err, existingUser){
                        if(err){
                            return res.send({success: false, message: 'Database error'}) 
                        }
                        else if (existingUser) {
                            return res.send({ success: false, message: 'User already exists'});
                        }
                        else {
                            new User ({
                                username: req.body.username,
                                email: req.body.email,
                                password: req.body.password,
                                albums: [],
                                wishList: []
                            }).save()
                                .then((user) => {
                                    authController.createUserToken(user, 201, req, res, 'User succesfully created.' );
                                    // return res.status(201).send({ success: true, message: 'User succesfully created.'})
                                })
                        }
                    });
             }
    });

    app.post('/api/signin',  (req, res) => {
        console.log('signin');
        if(!req.body.email || !req.body.password){
            res.status(400).json({ success: false, message: 'Email and/or password required.'})
        }
        else {
             User.findOne({ email: req.body.email}, function(err, user){
                if(err) {
                    return res.status(500).json({success: false, message: 'Database error'})
                }
                if (!user) {
                    return res.status(401).json({ success: false, message: 'User does not exist.'})
                }
                else {
                    if(user.password !== req.body.password){
                        return res.status(401).json({ success: false, message: 'Invalid password'})
                    }
                    
                    authController.createUserToken(user, 201, req, res, 'User succefully signed in.');
                    // return res.status(200).json({ success: true, message: 'signin successful'})
                }
            });
        }
    });

    app.get('/api/logout', (req, res) => {
    res.cookie('jwt', 'userLoggedOut', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
    });
    res.status(200).send({ success: true, message: "User has been logged out."})

    })

    app.get('/api/isUserLoggedIn', (req, res) => {
        console.log(req.headers.cookie)
        if(req.headers.cookie !== 'jwt=userLoggedOut' && req.headers.cookie !== undefined){
            console.log('user logged')
            authController.verifyJWT(req.headers.cookie, res);
        }
    });
    
    
    
    
    // catchAsync( async (req, res) => {
    //     console.log(req.headers.cookie);

    //     let currentUser;
    //     if(req.headers.cookie){
    //         const token = await req.headers.cookie;
    //         console.log('token: ' + token)
    //         let decoded =  await jwt.verify(token, keys.JWT_SECRET);
    //         console.log(decoded.user)
    //        }
        
    //     }

    // ));



}