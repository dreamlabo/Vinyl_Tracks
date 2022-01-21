const mongoose = require('mongoose');
const User = mongoose.model('users');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');



const INVALID_JWT = 'invalidJWT';

const verifyJwtIsValid = (cookieJWT) => {
    if(!cookieJWT) {
        return res.status(400).json({ success: false, message: 'No user jwt cookie was found in header.'});
    }
    else {
        // const userToken = cookieJWT;
        let verifiedUserToken;

        try {
            verifiedUserToken = jwt.verify(cookieJWT.split('=')[1], keys.JWT_SECRET);
        } catch(err) {
            return INVALID_JWT;
        }
        return verifiedUserToken; 
    }   
}



module.exports = app => {

    // create a new album in the 'AlbumInCollection' array of the user profile
    app.post('/api/addAlbumToCollection', async (req, res) => {
        console.log(req.body.artistName);
        console.log(req.body.albumName);

        if(!req.headers.cookie) {
            return res.status(400).json({ success: false, message: 'No user jwt cookie was found in header.'});
        }
        
        // Check for request for required attributes
        else if(!req.body.artistName || !req.body.albumName){
            return res.status(400).json({ success: false, message: 'Artist name and/or Album title required.'})
        }

        else {
            // Not a fan of how this function call and return is structured
            const decodedUserToken = verifyJwtIsValid(req.headers.cookie, res);
            if(decodedUserToken === INVALID_JWT) {
                return res.status(403).json({ success: false, message: 'Invalid and/or expired token.'});
            }
            // console.log('asd ' + decodedUserToken);


            // All checks for valid info and JWT pass we can proceed with adding album to the collection
           
            // set values for non-required attributes
            let dateAcquired = null;
            let whereAcquired = null;
            let purchasePrice = null;
            let condition = null;
            let recordRating = null;

            if(req.body.dateAcquired){
                dateAcquired = req.body.dateAcquired;
            }

            if(req.body.whereAcquired){
                whereAcquired = req.body.whereAcquired;
            }

            if(req.body.purchasePrice){
                purchasePrice = req.body.purchasePrice;  
            }

            if(req.body.condition){
                condition = req.body.condition
            }

            if(req.body.recordRating){
                recordRating = req.body.recordRating  
            }

            // const userToken = req.headers.cookie;
            // let decodedUserToken;

            // try {
            //     decodedUserToken = jwt.verify(userToken.split('=')[1], keys.JWT_SECRET);
            // } catch(err) {
            //     return res.status(403).json({ success: false, message: 'Invalid and/or expired token.'});
            // }

            // if(!decodedUserToken) {
            //     return res.status(403).json({ success: false, message: 'Invalid and/or expired token.'});
            // }
            // currentUser = await User.findById(decodedUserToken.id);

            // search for a user by ID and update the users AlbumCollection array 
            // If a user with that ID is not found, Mongo returns an empty object
            const updatedUser = await User.findByIdAndUpdate(
                decodedUserToken.id,
                {$push: {'albums': {
                    artistName: req.body.artistName,
                    albumName: req.body.albumName,
                    dateAcquired: dateAcquired,
                    whereAcquired: whereAcquired,
                    purchasePrice: purchasePrice,
                    condition: condition,
                    recordRating: recordRating
                }}},
                { upsert: false, new: true } // Does not create a new user if Id not found, returns the updated document
            )
            console.log(updatedUser);
            if(!updatedUser) {
                res.status(404).json({ success: false, message: 'User ID not found. Update not performed.'});
            }
            else{
                updatedUser.password = undefined;
                res.status(200).json({
                    success: true,
                    message: 'Album added to collection.',
                
                    userInfo: updatedUser
                    
                    }); 
                // res.status(201).json({ success: true, message: 'Album added to collection.'});
            }
        }
    });


    app.post('/api/addAlbumToWishList', async(req, res) => {
        console.log("addAlbumToWishList");
        console.log(req.body.artistName);
        console.log(req.body.albumName);

        if(!req.headers.cookie) {
            res.status(400).json({ success: false, message: 'No user jwt cookie was found in header.'});
        }
      
        // Check for request for required attributes
        else if (!req.body.artistName || !req.body.albumName) {
                    res.status(400).json({ success: false, message: 'Artist name and/or Album title required.'});
        }


        // else {
        //     const userToken = req.headers.cookie;
        //     let decodedUserToken;

        else {
            // Not a fan of how this function call and return is structured
            const decodedUserToken = verifyJwtIsValid(req.headers.cookie, res);
            if(decodedUserToken === INVALID_JWT) {
                return res.status(403).json({ success: false, message: 'Invalid and/or expired token.'});
            }

            // console.log('asd ' + decodedUserToken)

            const result = await User.findByIdAndUpdate(
                decodedUserToken.id,
                {$push: {'wishList': {
                    artistName: req.body.artistName,
                    albumName: req.body.albumName,

                }}},
                { upsert: false, new: true } // Does not create a new user if Id not found, returns the updated document
            )
            console.log(result);

            if(!result) {
                res.status(404).json({ success: true, message: 'User ID not found. Update not performed.'});
            }
            else {
                 res.status(201).json({ success: true, message: 'Album added to Wish List.'});
            }
        }
    });




}//End brace