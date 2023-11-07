const mongoose = require("mongoose");

const responseSchema = mongoose.Schema({
  formId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  answers: [{
    type: String, // Adjust the data type based on the type of response expected
    required: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const responseModel = mongoose.model("responses", responseSchema, "responses");

module.exports = responseModel;
