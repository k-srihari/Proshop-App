import bcrypt from 'bcrypt'

export default [
  {
    userName: 'The Admin',
    emailID: 'admin@xyz.com',
    password: bcrypt.hashSync('123456', 5),
    isAdmin: true,
  },
  {
    userName: 'John Doe',
    emailID: 'john@xyz.com',
    password: bcrypt.hashSync('123456', 5),
  },
  {
    userName: 'Jane Doe',
    emailID: 'jane@xyz.com',
    password: bcrypt.hashSync('123456', 5),
  },
]
