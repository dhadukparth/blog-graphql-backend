const jwt = require('jsonwebtoken')
const token_secret_key = process.env.WEB_TOKEN_SECRET_KEY;
const { v1: uuidV1 } = require('uuid');

// Response Function
const setResponse = (status, message, data) => {
    return {
        status,
        message,
        data
    }
}

//Generate UUID Key
const generateUUIDKey = () => {
    const now = new Date();
    const timestamp = now.getTime();
    const randomKey = Math.floor(Math.random() * 10000);

    const generate_key_pass = {
        msecs: timestamp,
        nsecs: randomKey,
    };

    return uuidV1(generate_key_pass);
}


// Encode JWT Token Function
const encodeJWTToken = (data) => {
    const jwt_token = jwt.sign(data, token_secret_key, { expiresIn: '30d' })
    return jwt_token
}

// Decode JWT Token Function
const decodeJWTToken = (jwt_token) => {
    const jwt_decoded = jwt.verify(jwt_token, token_secret_key);
    return jwt_decoded
}


module.exports = {
    generateUUIDKey,
    decodeJWTToken,
    encodeJWTToken,
    setResponse
}