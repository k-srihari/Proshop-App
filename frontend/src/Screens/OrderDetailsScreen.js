import { StrictMode, useEffect } from 'react'
import { Row, Col, ListGroup, ListGroupItem, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
import LoadingSpinner from '../Components/LoadingSpinner.js'

const OrderDetailsScreen = ({ match, history }) => {
  const { isLoading, order, error } = useSelector(
    (state) => state.orderDetailsReducer
  )
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)

  const dispatch = useDispatch()

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

  useEffect(() => {
    if (!userInfo) return history.push('/login')
    dispatch(getOrderDetails(match.params.id))
  }, [userInfo, history, dispatch, match])

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
                      Paid on: {order.paidAt}
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
                      Delivered on: {order.deliveredAt}
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
