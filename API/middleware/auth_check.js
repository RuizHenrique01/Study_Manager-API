const { verify } = require('jsonwebtoken');
const env = require('../commons/environments');

module.exports = (request, response, next) => {
    const authToken = request.headers.authorization;

    if (!authToken)
        return response.status(401).json({ error: "Auth Failed!" });

    const [prefix, token] = authToken.split(" ");

    if (prefix !== "Bearer")
        return response.status(401).json({ error: "Auth Failed!" });

    try {
        const decode = verify(token, env.JWT_KEY);

        request.userId = decode.userid;

        return next();
    } catch (err) {
        return response.status(401).json({ error: "Auth Failed!" });
    }
};