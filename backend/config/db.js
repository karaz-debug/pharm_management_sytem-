const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.set('strictQuery', false);

const connectToDb = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://james:EyAoaMxwslcs2hUg@cluster0.m6gdlpo.mongodb.net/test',
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log('Connected to MongoDB');

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectToDb;
