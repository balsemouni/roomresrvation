const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];  // Get the token from the Authorization header
            
            // Verify token
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = decoded;  // Attach the decoded user information to the request object

            next();
        } catch (error) {
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'No token, authorization denied' });
    }
};

module.exports = protect;
