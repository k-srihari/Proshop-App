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
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormComponent.js'
import LoadingSpinner from '../Components/LoadingSpinner.js'
import { userRegisterAction } from '../actions/userAuthenticationActions.js'

const RegisterScreen = ({ location, history }) => {
  const redirectUrl = location.search ? location.search.split('=')[1] : '/'

  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const { isLoading, newUser, error } = useSelector(
    (state) => state.userRegistrationReducer
  )

  const nameField = useRef('')
  const emailField = useRef('')
  const passwordField = useRef('')
  const confirmPasswordField = useRef('')

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (userInfo) history.push(redirectUrl)
    if (newUser) history.push('/login')
  }, [userInfo, newUser, history, redirectUrl])

  const handleFormSubmission = (e) => {
    e.preventDefault()
    if (passwordField.current.value !== confirmPasswordField.current.value) {
      setErrorMsg("Passwords Didn't Match! Try Again!")
    } else {
      setErrorMsg('')
      dispatch(
        userRegisterAction(
          nameField.current.value,
          emailField.current.value,
          passwordField.current.value
        )
      )
    }
  }

  return (
    <FormContainer>
      <h2>Sign Up</h2>
      {isLoading && <LoadingSpinner />}
      {error && <p className="danger">{error.message}</p>}
      {errorMsg && <p className="danger">{errorMsg}</p>}
      <Form onSubmit={handleFormSubmission}>
        <FormGroup controlId="name">
          <FormLabel>Your Full Name: </FormLabel>
          <FormControl ref={nameField} type="text" />
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>Email Address: </FormLabel>
          <FormControl ref={emailField} type="email" />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password: </FormLabel>
          <FormControl ref={passwordField} type="password" />
        </FormGroup>
        <FormGroup controlId="confirmPassword">
          <FormLabel>Confirm Password: </FormLabel>
          <FormControl ref={confirmPasswordField} type="password" />
        </FormGroup>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

      <Row>
        <Col>
          Already have an account? Login{' '}
          <Link to={'/login?redirect=/'}>
            <strong>here</strong>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
