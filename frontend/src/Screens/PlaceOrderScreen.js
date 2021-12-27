import { StrictMode, useEffect } from 'react'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Button,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addNewOrder } from '../actions/orderActions.js'
import CartCycle from '../Components/CartCycle.js'

const PlaceOrderScreen = ({ history }) => {
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cartReducer
  )
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const { isLoading, order, error } = useSelector(
    (state) => state.createOrderReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (order) {
      dispatch({ type: 'ORDER_CREATE_RESET' })
      history.push(`/orders/${order._id}`)
    }
  }, [order, history, dispatch])

  const roundThePrice = (price) =>
    Number((Math.round(price * 100) / 100).toFixed(2))
  const itemsPrice = roundThePrice(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
  )
  const shippingPrice = itemsPrice > 100 ? 0 : 10
  const taxPrice = roundThePrice(itemsPrice * 0.18)
  const totalPrice = roundThePrice(itemsPrice + shippingPrice + taxPrice)

  const placeOrderHandler = (e) => {
    e.preventDefault()

    const orderData = {
      orderedBy: userInfo.userID,
      orderItems: cartItems.map((i) => {
        return {
          itemID: i.productID,
          itemName: i.productName,
          itemImage: i.image,
          price: i.price,
          quantity: i.qty,
        }
      }),
      shippingAddress,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,
    }

    dispatch(addNewOrder(orderData))
  }

  return (
    <StrictMode>
      <CartCycle step1 step2 step3 step4 />
      <h2>Review and Place Order</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" className="my-4">
            <ListGroup.Item>
              <h3>Ship To:</h3>
              <p>
                <strong>Address: </strong>
                {shippingAddress.address +
                  ', ' +
                  shippingAddress.city +
                  ', ' +
                  shippingAddress.country +
                  ' - ' +
                  shippingAddress.postCode}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Payment Method:</h3>
              <p>PayPal</p>
            </ListGroup.Item>
            <ListGroup.Item>
              {cartItems.length === 0 ? (
                <h3>Your cart is empty!</h3>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.productID}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>{item.productName}</Col>
                        <Col md={4}>
                          {item.qty +
                            ' * ' +
                            item.price +
                            ' = ' +
                            item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <h3>Order Summary</h3>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>Items Price: $ {itemsPrice}</ListGroupItem>
              <ListGroupItem>Shipping Price: $ {shippingPrice}</ListGroupItem>
              <ListGroupItem>Tax Price: $ {taxPrice}</ListGroupItem>
              <ListGroupItem>Total: $ {totalPrice}</ListGroupItem>
            </ListGroup>
            <Button className="my-2" onClick={placeOrderHandler}>
              Place Your Order
            </Button>
            {isLoading && <p className="text-info">Placing Order ... </p>}
            {error && <p className="text-danger">{error}</p>}
          </Card>
        </Col>
      </Row>
    </StrictMode>
  )
}

export default PlaceOrderScreen
