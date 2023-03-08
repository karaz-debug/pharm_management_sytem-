const express = require('express');
const Patient = require('../models/patient');
const router = express.Router();

router.post('/patient', async (req, res) => {
    console.log(req.body)
    try {
        const {
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            state,
            zip,
            dob,
            dop,
            gender,
            health_issues,
            insurance_company,
            policy_number,

        } = req.body;

        const patient = new Patient({
            first_name,
            last_name,
            email,
            phone,
            address,
            city,
            state,
            zip,
            dob,
            dop,
            gender,
            health_issues,
            insurance_company,
            policy_number,
            patient_health_report: "",
            prescriptions: "",
            status: false
        });

        await patient.save();
        res.status(201).send(patient);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.get('/patient', async (req, res) => {
    try {
        let patients = await Patient.find({});

        if (req.query.patients) {
            const regex = new RegExp(req.query.patients, 'i');
            patients = patients.filter(patient => regex.test(patient.Supplier));
        }

        res.status(200).json({ patients });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// GET data for a specific patient
router.get('/patient/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        const patient = await Patient.findOne({ _id: req.params.id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/patient/:id', async (req, res) => {
    const id = req.params.id;

    console.log(`Patient id ${id}`);

    try {
        // Find the existing patient report in the database
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).send('Patient  not found');
        } else {
            // Update the patient report with the new data from the request body
            patient.patient_health_report = req.body.patientReport.patient_health_report;
            patient.prescriptions = req.body.patientReport.prescriptions;
            patient.status = true

            // Save the updated patient report to the database
            const updatedpatient = await patient.save();
            res.send(updatedpatient);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating patient report');
    }
});

module.exports = router;
