import User from '../schemas/UserSchema.js'

const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userID)
    if (user.isAdmin) {
      next()
    } else {
      return res.status(401).json({ error: 'User not authorized as an Admin!' })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default checkAdmin
