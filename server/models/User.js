const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AlbumInCollectionSchema = require('./AlbumInCollection');
const AlbumWishListSchema = require('./AlbumWishlist')

const userSchema = new Schema({
    username: {type: String, trim: true, required: true},
    email: {type: String, trim: true, required: true},
    password: { type: String, trim: true, required: true },
    albums: [AlbumInCollectionSchema],
    wishList: [AlbumWishListSchema]
    
});

mongoose.model('users', userSchema);