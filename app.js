require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorHandler = require('middlewares').errorHandler;
const appConfig = require('config').appConfig;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
}));

app.use('/', require('routes'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (appConfig.REST_API_PORT || 80) : 5000;
app.listen(port, () => {
    console.log(`${appConfig.REST_API_NAME} is listening on port ${port}`);
});
