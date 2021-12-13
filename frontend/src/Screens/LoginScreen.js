import FormComponent from '../Components/FormComponent.js'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../actions/userAuthenticationActions.js'
import LoadingSpinner from '../Components/LoadingSpinner.js'
import { Link } from 'react-router-dom'

const LoginScreen = ({ history, location }) => {
  const redirectTo = location.search ? location.search.split('=')[1] : '/'

  const { isLoading, userInfo, error } = useSelector(
    (state) => state.userAuthenticationReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      history.push(redirectTo)
    }
  }, [history, userInfo, redirectTo])

  const emailField = useRef('')
  const passwordField = useRef('')

  const handleFormSubmission = (e) => {
    e.preventDefault()
    dispatch(
      userLoginAction(emailField.current.value, passwordField.current.value)
    )
  }

  return (
    <FormComponent>
      <h2>Sign In</h2>
      {isLoading && <LoadingSpinner />}
      {error && <p color="red">{error}</p>}
      <Form onSubmit={handleFormSubmission}>
        <FormGroup controlId="email">
          <FormLabel>Email Address: </FormLabel>
          <FormControl ref={emailField} type="email" />
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password: </FormLabel>
          <FormControl ref={passwordField} type="password" />
        </FormGroup>
        <Button variant="primary" type="submit" className="py-13">
          Login
        </Button>
      </Form>

      <Row>
        <Col>
          New Customer? Register{' '}
          <Link to={`/register?redirect=${redirectTo}`}>
            <strong>here</strong>
          </Link>
        </Col>
      </Row>
    </FormComponent>
  )
}

export default LoginScreen
