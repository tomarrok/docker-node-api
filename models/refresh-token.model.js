const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    token: { type: String },
    expires: { type: Date },
    created: { type: Date, default: Date.now },
    createdByIp: { type: String },
    revoked: { type: Date },
    revokedByIp: { type: String },
    replacedByToken: { type: String }
});

schema.virtual('isExpired').get(function() {
    return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function() {
    return !this.revoked && !this.isExpired;
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id,
        delete ret.id
        delete ret.user
    }
})

module.exports = mongoose.model('RefreshToken', schema);
