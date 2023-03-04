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
        enum: ['cash', 'online'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    medicines: [{
        medicineName: {
            type: String,
            required: true
        },
        packaging: {
            type: String,
            required: true
        },
        batchID: String,
        expiryDate: {
            type: Date,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }]
});


const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;






