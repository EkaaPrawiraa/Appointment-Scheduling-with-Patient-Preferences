const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Masokk!');
    } catch (error) {
        console.error('Error euy', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
