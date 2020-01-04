var crypto = require('crypto');
let config = require("../config/config");
let secure_key = config.secure_key;
let algorithm = config.algorithm;
let iv = config.iv;
let jwtToken = config.jwtToken;

//middelwhere
let jwt = require('jsonwebtoken');


exports.encrypt = (value) => {
    
    var cipher = crypto.createCipheriv(algorithm, secure_key, iv)
    var crypted = cipher.update(value, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

exports.decrypt = (value) => {
    var decipher = crypto.createDecipheriv(algorithm, secure_key, iv)
    var dec = decipher.update(value, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}



exports.createPayload = (key) => {
    let payload = { subject: key }
    let token = jwt.sign(payload, jwtToken)
    return token;
}



exports.tokenMiddleware = (request, res, next) => {
    if (!request.headers.authorization) {
        return res.status(401).send('unauthorized')
    }
    let token = request.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('unauthorized')
    } else {
        let payload = jwt.verify(token, jwtToken)
        if (!payload) {
            return res.status(401).send('unauthorized')
        }
        request.userId = payload.subject;
        next();
    }
}
