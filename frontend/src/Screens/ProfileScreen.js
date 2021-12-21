import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Table,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import LoadingSpinner from '../Components/LoadingSpinner.js'
import { getUserOrders } from '../actions/orderActions.js'
import {
  getUserProfile,
  updateUserProfile,
} from '../actions/userProfileActions.js'
import { Link } from 'react-router-dom'

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLoggedIn = useSelector(
    (state) => state.userAuthenticationReducer.userInfo
  )
  const { userProfile } = useSelector((state) => state.getProfileReducer)
  const updatedUser = useSelector((state) => state.updateProfileReducer)
  const {
    isLoading: ordersLoading,
    orders,
    error: errorLoadingOrders,
  } = useSelector((state) => state.getUserOrdersReducer)

  const nameField = useRef('')
  const emailField = useRef('')
  const passwordField = useRef('')
  const confirmPasswordField = useRef('')

  useEffect(() => {
    if (!userLoggedIn) {
      return history.push('/login')
    }

    if (!userProfile || userProfile.emailID !== userLoggedIn.emailID) {
      dispatch(getUserProfile())
      dispatch(getUserOrders())
    }

    if (userProfile) {
      nameField.current.value = userProfile.userName
      emailField.current.value = userProfile.emailID
    }
  }, [
    dispatch,
    userProfile,
    nameField,
    emailField,
    userLoggedIn,
    history,
    orders,
  ])

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
        {ordersLoading ? (
          <LoadingSpinner />
        ) : errorLoadingOrders ? (
          <p>{errorLoadingOrders.message}</p>
        ) : !orders || orders.length === 0 ? (
          <p className="text-warning">You don't have any orders yet!</p>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.createdAt.slice(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.slice(0, 10)
                    ) : (
                      <i className="fas fa-times" />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.slice(0, 10)
                    ) : (
                      <i className="fas fa-times" />
                    )}
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`}>
                      <i className="fas fa-search" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
