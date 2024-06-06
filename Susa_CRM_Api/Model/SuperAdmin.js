const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
// Assuming environment variable is used for the secret key
const keySecret = process.env.JWT_SECRET_KEY;

const superAdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, // Email should be required for login purposes
        unique: true, // Assuming email should be unique
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false
    },
    // Example array fields with String type elements
    tag: [],
    stage: [],
    status: [],
    lreason: [],
    priority: [],
    source: [],
    tokens: [{ token: String }] // Storing JWTs issued
});

superAdminSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            next(error);
        }
    }
    next();
});

superAdminSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, keySecret, { expiresIn: '1d' });
        this.tokens.push({ token });
        await this.save();
        return token;
    } catch (error) {
        console.error('Error generating auth token:', error);
        throw new Error('Error generating auth token: ' + error.message);
    }
};

module.exports = mongoose.model('Superadmin', superAdminSchema);
