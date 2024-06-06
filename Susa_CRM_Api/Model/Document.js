const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anySchema = new Schema({}, { strict: false }); // `strict: false` allows any field to be inserted
const AnyModel = mongoose.model('Documents', anySchema);
module.exports = AnyModel;