const mongoose = require('mongoose');

const Product = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum:['shoes', 'shirts']
    },
    ratings: {
        average: {
            type: Number,

            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    }
});

const productModel = mongoose.model('Product', Product);
module.exports = productModel;
