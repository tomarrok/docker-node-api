module.exports = {
    userService: {
        getAll: require('services/user.service').getAll,
        getById: require('services/user.service').getById
    },
    authService: require('services/auth.service')
}
