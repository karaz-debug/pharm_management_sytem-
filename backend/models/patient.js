const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    dop: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    health_issues: {
        type: String,
        required: true
    },
    insurance_company: {
        type: String,
        required: true
    },
    policy_number: {
        type: String,
        required: true
    },
    patient_health_report: {
        type: String,
    },
    prescriptions: {
        type: String,
    },
    status: {
        type: Boolean,
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
