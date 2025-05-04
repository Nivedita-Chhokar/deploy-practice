const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB successfully connected ", conn.connection.host);
    } catch(error) {
        console.log("Failed to connect DB");
        process.exit(1);
    }
};

module.exports = connectDB;
