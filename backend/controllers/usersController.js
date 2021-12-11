import User from '../schemas/UserSchema.js'
import tokenGen from '../jwtGenerator.js'

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ emailID: req.body.email })

    if (!user)
      return res
        .status(401)
        .json({ message: 'No user found with the given email ID!' })

    if (await user.verifyPassword(req.body.password))
      return res.status(200).json({
        userID: user._id,
        username: user.userName,
        emailID: user.emailID,
        isAdmin: user.isAdmin,
        token: tokenGen(user.emailID),
      })

    res.status(401).json({ message: 'Invalid Password!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unforeseen error!' })
  }
}

export { loginUser }
