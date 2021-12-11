import User from '../schemas/UserSchema.js'
import tokenGen from '../jwtGenerator.js'

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  if (await User.findOne({ emailID: email }))
    return res.status(409).json({
      Error: 'An user with the given Email-ID already exists!',
    })

  try {
    const newUser = await User.create({
      userName: name,
      emailID: email,
      password,
    })

    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

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

const getUserProfile = async (req, res) => {
  try {
    const theUser = await User.findOne({ emailID: req.userEmail })
      .select('-password')
      .select('-_id')
      .select('-__v')

    res.send(theUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unforeseen error!' })
  }
}

export { registerUser, loginUser, getUserProfile }
