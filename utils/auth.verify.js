var jwt = require('jsonwebtoken');

const publicRoutes = [
    '/api/auth',
    'api/auth/verify',
    'api/auth/refresh'
]

exports.verify = async (req, res, next) => {
    
    if(publicRoutes.includes(req._parsedUrl.pathname)) return next()

    const refreshToken = req.cookies.jwt;
    if(!refreshToken) return res.status(403).send('Token not found')

    jwt.verify(refreshToken, 'considerthisasarefreshtokenkey', function(err, decoded) {
        if (err) {
          return res.status(403).send('Token Expired!')
        }

        req._id = decoded._id
       
        //check for accesstoken
        const authHeader = req.headers.authorization
        if(!authHeader) return res.status(401).send('Access token not found')

        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'considerthisasecretkey', function(err, decoded) {
            if (err) {
              return res.status(401).send('Access Token Expired!')
            }
            return next()       
          });
    });
}