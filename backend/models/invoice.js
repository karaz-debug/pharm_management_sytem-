const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true
    },
    customer: {
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
    contact: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },

    items: {
        type: Array,
        required: true
    },
    paid: {
        type: Number,
        required: true
    },
    change: {
        type: Number,
        required: true
    }
});



const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
