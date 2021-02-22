const userService = require('services').userService;

function getAll(req, res, next) {
    userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

function getById(req, res, next) {
    if (req.params.id !== req.user.id && req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(next);
}

module.exports = {
    getAll,
    getById
}
