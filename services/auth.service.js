const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailValidator = require('email-validator');

const secret = require('config').appConfig.REST_API_SECRET;
const salt = require('config').appConfig.REST_API_SECRET_HASHSALT;
const db = require('helpers').db;

const userService = require('services/user.service');

async function signup({ email, password }) {
    const isValidEmail = emailValidator.validate(email);
    const isValidPassword = (password.length >= 8 && password.length <= 128)

    if (!isValidEmail || !isValidPassword) {
        throw 'Email or password is incorrect';
    }

    if (await db.User.findOne({ email })) throw 'User already exists';

    const role = await db.User.findOne({ role: 'Admin' }) ? 'User' : 'Admin';
    const passwordHash = bcrypt.hashSync(password, salt);

    const user = new db.User({ email, passwordHash, role });

    await user.save();
}

async function signin({ email, password, ipAddress }) {
    const user = await db.User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        throw 'Email or password is incorrect';
    }

    const jwtToken = generateJwtToken(user);
    const refreshToken = generateRefreshToken(user, ipAddress);

    await refreshToken.save();

    return {
        ...userService.basicDetails(user),
        jwtToken,
        refreshToken: refreshToken.token
    };
}

async function refreshToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);
    const { user } = refreshToken;

    const newRefreshToken = generateRefreshToken(user, ipAddress);

    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;

    await refreshToken.save();
    await newRefreshToken.save();

    const jwtToken = generateJwtToken(user);
    
    return {
        ...userService.basicDetails(user),
        jwtToken,
        refreshToken: newRefreshToken.token
    };
}

async function revokeToken({ token, ipAddress }) {
    const refreshToken = await getRefreshToken(token);

    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    
    await refreshToken.save();
}

async function getRefreshTokens(userId) {
    await userService.getUser(userId);

    const refreshTokens = await db.RefreshToken.find({ user: userId });

    return refreshTokens;
}

async function getRefreshToken(token) {
    const refreshToken = await db.RefreshToken.findOne({ token }).populate('user');

    if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';

    return refreshToken;
}

function generateJwtToken(user) {
    return jwt.sign({ sub: user.id, id: user.id }, secret, { expiresIn: '15m' });
}

function generateRefreshToken(user, ipAddress) {
    return new db.RefreshToken({
        user: user.id,
        token: randomTokenString(),
        expires: new Date(Date.now() + 7*24*60*60*1000),
        createdByIp: ipAddress
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

module.exports = {
    signup,
    signin,
    refreshToken,
    revokeToken,
    getRefreshTokens
}
