import { StrictMode, useEffect, useState } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { getOrderDetails, recordOrderPayment } from '../actions/orderActions.js'
import LoadingSpinner from '../Components/LoadingSpinner.js'
import { ORDER_PAYMENT_RESET } from '../constants/orderConstants'

const OrderDetailsScreen = ({ match, history }) => {
  const { isLoading, order, error } = useSelector(
    (state) => state.orderDetailsReducer
  )
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const {
    isLoading: paymentLoading,
    isSuccess: paymentSuccess,
    // eslint-disable-next-line no-unused-vars
    error: paymentError,
  } = useSelector((state) => state.orderPaymentReducer)

  const dispatch = useDispatch()

  const [paypalSDKReady, setpPaypalSDKReady] = useState(false)

  const addPaypalScript = async () => {
    const paypalClientID = (await axios.get('/api/config/paypal')).data

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientID}`
    script.async = true
    script.onload = () => setpPaypalSDKReady(true)
    document.body.appendChild(script)
  }

  useEffect(() => {
    if (!userInfo) return history.push('/login')

    if (!order || paymentSuccess || order._id !== match.params.id) {
      dispatch({
        type: ORDER_PAYMENT_RESET,
      })
      dispatch(getOrderDetails(match.params.id))
    } else {
      if (!order.isPaid) {
        if (!window.paypal) addPaypalScript()
        else setpPaypalSDKReady(true)
      }
    }
  }, [userInfo, history, dispatch, match, order, paymentSuccess])

  const fullAddress = order
    ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country} - ${order.shippingAddress.postCode}`
    : ''

  const roundThePrice = (price) => (Math.round(price * 100) / 100).toFixed(2)
  const itemsPrice = order
    ? roundThePrice(
        order.orderItems.reduce(
          (acc, curr) => acc + curr.price * curr.quantity,
          0
        )
      )
    : 0

  const handlePaymentSuccess = (paymentResult) => {
    console.log(paymentResult)
    dispatch(recordOrderPayment(order._id, paymentResult))
  }

  return (
    <StrictMode>
      <h2>Order:{' ' + match.params.id}</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : order ? (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>Shipping To:</h3>
                <p>{fullAddress}</p>
              </ListGroupItem>
              <ListGroupItem>
                <h3>Payment Details:</h3>
                <p>
                  Status:{' '}
                  {order.isPaid ? (
                    <span className="text-success">
                      Paid on:{' '}
                      {order.paidAt.slice(0, 10) +
                        ' ~ ' +
                        order.paidAt.slice(11, 19)}
                    </span>
                  ) : (
                    <span className="text-danger">! Not Paid</span>
                  )}
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <h3>Delivery Details:</h3>
                <p>
                  Status:{' '}
                  {order.isDelivered ? (
                    <span className="text-success">
                      Delivered on:{' '}
                      {order.deliveredAt.slice(0, 10) +
                        ' ~ ' +
                        order.deliveredAt.slice(11, 19)}
                    </span>
                  ) : (
                    <span className="text-info">Delivery In Progress</span>
                  )}
                </p>
              </ListGroupItem>
              <ListGroupItem>
                <h3>Items Details:</h3>
                <ListGroup variant="flush">
                  {order.orderItems.map((item) => (
                    <ListGroupItem key={item.itemID}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.itemImage}
                            alt={item.itemName}
                            fluid
                          />
                        </Col>
                        <Col md={6}>{item.itemName}</Col>
                        <Col md={4}>
                          {` ${item.quantity} x ${item.price} = ${
                            item.quantity * item.price
                          }`}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={4}>
            <h3>Order Summary:</h3>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Items Total:</Col>
                  <Col>{` $${itemsPrice}`}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Tax:</Col>
                  <Col>{` $${order.taxPrice}`}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>{` $${order.shippingPrice}`}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>GRAND TOTAL:</Col>
                  <Col>{` $${order.totalPrice}`}</Col>
                </Row>
              </ListGroupItem>
              {!order.isPaid && (
                <ListGroupItem>
                  {!paypalSDKReady || paymentLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={handlePaymentSuccess}
                    />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Col>
        </Row>
      ) : (
        <p className="text-danger">{error}</p>
      )}
    </StrictMode>
  )
}

export default OrderDetailsScreen
