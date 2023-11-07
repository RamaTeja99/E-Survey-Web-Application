const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "A user must have name"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "A user must have email"]
    },
    password: {
        type: String,
        required: [true, "A user must create a password"]
    },
    phoneNumber: {
        type: String
    },
    uid: {
        type: String,
        unique: true,
        trim: true
    }
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema, "users");
module.exports = userModel;
