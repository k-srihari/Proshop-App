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
        userName: user.userName,
        emailID: user.emailID,
        isAdmin: user.isAdmin,
        token: tokenGen(user._id),
      })

    res.status(401).json({ message: 'Invalid Password!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unforeseen error!' })
  }
}

const getUserProfile = async (req, res) => {
  try {
    const theUser = await User.findById(req.userID)
      .select('-password')
      .select('-_id')
      .select('-__v')

    res.send(theUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unforeseen error!' })
  }
}

const updateUserProfile = async (req, res) => {
  try {
    const theUser = await User.findById(req.userID)

    if (req.body.name) theUser.userName = req.body.name
    if (req.body.email) theUser.emailID = req.body.email
    if (req.body.password) theUser.password = req.body.password

    const updatedUser = await theUser.save()

    res.json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unforeseen error!' })
  }
}

/* Admin Only Stuff Below */

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
    res.json(allUsers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const deleteUser = async (req, res) => {
  try {
    const theUser = await User.findById(req.params.id)
    if (!theUser)
      return res.status(404).json({ error: 'No user found with the given ID!' })
    await theUser.remove()
    res.json({ success: 'User successfully deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const getUser = async (req, res) => {
  try {
    const theUser = await User.findById(req.params.id).select('-password')
    if (!theUser)
      return res.status(404).json({ error: 'No user found with the given ID!' })
    res.json(theUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

const editUser = async (req, res) => {
  try {
    const theUser = await User.findById(req.params.id)
    if (!theUser)
      return res.status(404).json({ error: 'No user found with the given ID!' })
    theUser.userName = req.body.name || theUser.userName
    theUser.emailID = req.body.email || theUser.emailID
    theUser.isAdmin = req.body.adminStatus
    const updatedUser = await theUser.save()
    res.json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUser,
  editUser,
}
