const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        phoneNumber: {
            type: Number,
        },
        questions: [
            {
                text: { type: String }, // The text of the question
                type: { type: String }, // The type of the question (e.g., "text", "multiple-choice", etc.)
                options: [{ type: String }], // Array of options for multiple-choice questions (if applicable)
            },
        ],
        userId: {
            type: mongoose.Types.ObjectId,
        },
        uniqueLink: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

const formModel = mongoose.model("forms", formSchema, "forms");
module.exports = formModel;
