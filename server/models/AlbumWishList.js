const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumWishListSchema = new Schema({

    artistName: {type: String, trim: true, required: true},
    albumName: { type: String, required: true },
    
});


module.exports = albumWishListSchema;