const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity : {
            type: Number,
            required: true,
            min: 1
        },
        price : {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Paid', 
    },
    orderStatus: {
        type: String,
        enum: [
          'Pending',
          'Processing',
          'Shipped',
          'Delivered',
          'Undelivered',
          'Cancelled',
        ],
        default: 'Pending',
    },
    shippingAddress: {
        name: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orderModel = mongoose.model('Orders', orderSchema);
module.exports = orderModel;
