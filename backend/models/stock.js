const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    selectedSupplier: {
        type: String,
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;







