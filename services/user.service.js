const db = require('helpers').db;

async function getAll() {
    const users = await db.User.find();

    return users.map(user => basicDetails(user));
}

async function getById(id) {
    const user = await getUser(id);

    return basicDetails(user);
}

// Helpers functions

async function getUser(id) {
    if (!db.isValidId(id)) throw 'User not found';

    const user = await db.User.findById(id);
    if (!user) throw 'User not found'

    return user;
}

function basicDetails(user) {
    const { id, email, firstname, lastname, role } = user;
    return { id, email, firstname, lastname, role };
}

module.exports = {
    getAll,
    getById,
    getUser,
    basicDetails
}
