const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
    name: { type: String, required: true },
    packaging: { type: String, required: true },
    BatchID: { type: Number, required: true },
    Exdate: { type: String, required: true },
    supplier: { type: String, required: true },
    Quantity: { type: String, required: true },

});

const Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;


