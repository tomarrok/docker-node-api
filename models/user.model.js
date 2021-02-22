const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id,
        delete ret.passwordHash
    }
})

module.exports = mongoose.model('User', schema);
