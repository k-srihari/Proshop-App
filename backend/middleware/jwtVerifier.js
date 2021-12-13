import jwt from 'jsonwebtoken'

const verifyJWT = (req, res, next) => {
  let authHeader = req.headers.authorization

  if (!(authHeader && authHeader.startsWith('Bearer')))
    return res
      .status(401)
      .json({ Error: 'Missing or Invalid Authorization Headers!' })

  try {
    let token = authHeader.slice(7)

    let tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.userID = tokenDecoded.id

    next()
  } catch (error) {
    return res.status(401).json({ Error: 'Invalid Token!' })
  }
}

export default verifyJWT
