const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    ExpiryDate: {
        type: Date,
        required: true
    },
    PurchasePrice: {
        type: Number,
        required: true
    },
    ReceivedBy: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    ReceivedDate: {
        type: Date,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    supplier: {
        type: String,
        required: true
    }
});


const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;


