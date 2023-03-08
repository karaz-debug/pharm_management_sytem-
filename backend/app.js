const express = require('express');
const app = express();
const cors = require('cors');

const adminRoutes = require('./routes/admin');
const monitorRoutes = require('./routes/monitor');


app.use(express.json({ extended: false }));
app.use(cors());


app.use('/admin', adminRoutes);
app.use('/monitor', monitorRoutes);



module.exports = app;

