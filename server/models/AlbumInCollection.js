const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumInCollectionSchema = new Schema({

    artistName: {type: String, trim: true, required: true},
    albumName: { type: String, required: true },
    dateAcquired: Date,
    whereAcquired: { type: String, trim: true },
    purchasePrice: { type: Number, trim: true },
    condition: { type: String, trim: true },
    recordRating: { type: Number, trim: true },
    
});

// mongoose.model('albumInCollection', albumInCollectionSchema);
module.exports = albumInCollectionSchema;