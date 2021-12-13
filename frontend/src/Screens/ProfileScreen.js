import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  getUserProfile,
  updateUserProfile,
} from '../actions/userProfileActions'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLoggedIn = useSelector(
    (state) => state.userAuthenticationReducer.userInfo
  )
  const theUser = useSelector((state) => state.getProfileReducer)
  const updatedUser = useSelector((state) => state.updateProfileReducer)

  const nameField = useRef('')
  const emailField = useRef('')
  const passwordField = useRef('')
  const confirmPasswordField = useRef('')

  useEffect(() => {
    if (!userLoggedIn) {
      history.push('/login')
    }

    if (!theUser.userProfile && !theUser.isLoading) {
      dispatch(getUserProfile())
    }
    if (theUser.error) {
      console.log(theUser.error.message)
    }
    if (
      theUser.userProfile &&
      !(nameField.current.value && emailField.current.value)
    ) {
      nameField.current.value = theUser.userProfile.userName
      emailField.current.value = theUser.userProfile.emailID
    }
  }, [dispatch, theUser, nameField, emailField, userLoggedIn, history])

  const [msg, setMsg] = useState('')

  const handleUpdateSubmission = (e) => {
    e.preventDefault()

    if (passwordField.current.value !== confirmPasswordField.current.value) {
      setMsg("Passwords didn't match! Try again!")
    } else {
      dispatch(
        updateUserProfile(
          nameField.current.value,
          emailField.current.value,
          passwordField.current.value
        )
      )
      if (updatedUser.error) {
        console.log(updatedUser.error)
        setMsg(updatedUser.error.message)
      } else {
        passwordField.current.value = ''
        confirmPasswordField.current.value = ''
        dispatch(getUserProfile())
        setMsg('Profile update success!')
      }
    }
  }

  return (
    <Row className="my-4">
      <Col md={3}>
        <h2>Your Profile:</h2>
        <Form onSubmit={handleUpdateSubmission}>
          {msg && <p>{msg}</p>}
          <FormGroup>
            <FormLabel>Your Full Name:</FormLabel>
            <FormControl ref={nameField} type="text" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email Address:</FormLabel>
            <FormControl ref={emailField} type="email" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password:</FormLabel>
            <FormControl ref={passwordField} type="password" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Confirm Password:</FormLabel>
            <FormControl ref={confirmPasswordField} type="password" />
          </FormGroup>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Your Orders:</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
