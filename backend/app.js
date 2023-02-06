const express = require('express');
const app = express();
const cors = require('cors');

const adminRoutes = require('./routes/admin');


app.use(express.json({ extended: false }));
app.use(cors());


app.use('/admin', adminRoutes);



module.exports = app;

