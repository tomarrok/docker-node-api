const config = require('config').dbConfig;
const mongoose = require('mongoose');

const models = require('models');

const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: config.MONGODB_USERNAME,
    pass: config.MONGODB_PASSWORD,
    dbName: config.MONGODB_DATABASE
};

// Connection to MongoDB
mongoose.connect('mongodb://' + config.MONGODB_HOSTNAME, options);

mongoose.Promise = global.Promise;

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
    User: models.User,
    RefreshToken: models.RefreshToken,
    isValidId
};
