module.exports = {
    authorize: require('middlewares/authorize.middleware'),
    errorHandler: require('middlewares/error-handler.middleware'),
    validateRequest: require('middlewares/validate-request.middleware')
}
