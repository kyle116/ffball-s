jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const token = req.headers['token']

  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) return res.json({success: false, message: "Token could not be verified."})

    req.user = decoded
    next()
    })
  } else {
    res.json({success: false, message: "No token provided. Access denied."})
  }
}
