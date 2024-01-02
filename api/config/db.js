const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/spregistration");
        console.log(`MONGO GOT CONNECTED`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;