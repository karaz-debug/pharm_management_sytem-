const express = require('express');
const connectToDb = require('./config/db');
const app = require('./app');
const port = 3001;

// Connect to MongoDB
connectToDb();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


