import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import addToCart from '../actions/addToCartAction'
import removeFromCart from '../actions/removeFromCartAction'

const CartScreen = ({ match, location, history }) => {
  const productID = match.params.id
  const qty = location.search ? parseInt(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cartReducer.cartItems)

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  }, [dispatch, productID, qty])

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const handleCheckoutClick = () => {
    history.push('/login?redirect=/checkout')
  }

  return (
    <div style={{ margin: '20px 0px' }}>
      {cartItems.length === 0 ? (
        <h2>
          You cart is all empty! <Link to="/">Go Back</Link>
        </h2>
      ) : (
        <Row>
          <Col md={8}>
            <h2>Your Cart:</h2>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.productID}>
                  <Row style={{ padding: '16px 8px' }}>
                    <Col md={3}>
                      <Image src={item.image} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/products/${item.productID}`}
                      >
                        {item.productName}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Row>
                        <Col md={5}>Qty: </Col>
                        <Col md={7}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(event) =>
                              dispatch(
                                addToCart(
                                  item.productID,
                                  parseInt(event.target.value)
                                )
                              )
                            }
                            style={{ display: 'inline' }}
                          >
                            {[...Array(item.stock).keys()].map((val) => (
                              <option key={val} value={val + 1}>
                                {val + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Button
                        onClick={() => handleRemoveItem(item.productID)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h4>
                  Subtotal: (
                  {cartItems.reduce((total, curr) => total + curr.qty, 0)}
                  )items
                </h4>
              </ListGroupItem>
              <ListGroupItem>
                $
                {cartItems
                  .reduce((total, curr) => total + curr.qty * curr.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  onClick={() => handleCheckoutClick()}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default CartScreen
