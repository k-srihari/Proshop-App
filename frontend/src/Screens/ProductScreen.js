import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Rating from '../Components/Rating'
import fetchProductDetailsAction from '../actions/fetchProductDetailsAction.js'
import LoadingSpinner from '../Components/LoadingSpinner'

const ProductScreen = ({ match }) => {
  const { product, isLoading, error } = useSelector(
    (state) => state.productDetailsReducer
  )
  const doDispatch = useDispatch()

  useEffect(() => {
    doDispatch(fetchProductDetailsAction(match.params.id))
  }, [match.params.id, doDispatch])

  return (
    <Container>
      <Link to="/" className="my-4 btn btn-light">
        Go Back
      </Link>
      {isLoading ? (
        <LoadingSpinner />
      ) : product ? (
        <Row>
          <Col md={6}>
            <Image src={product.productImage} fluid />
          </Col>
          <Col sm={6} md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.productName}</h3>
              </ListGroup.Item>
              <ListGroupItem>
                <Rating
                  value={product.avgRating}
                  ratings={product.reviewsCount}
                />
              </ListGroupItem>
              <ListGroupItem>
                <h6>Description:</h6>
                <p>{product.description}</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col sm={6} md={3}>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>Price: </Col>
                  <Col>$ {product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroup.Item>
                <Row>
                  <Col>Status: </Col>
                  <Col>
                    {product.stocksCount > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={product.stocksCount === 0}
                >
                  ADD TO CART
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      ) : (
        <h3>{error}</h3>
      )}
    </Container>
  )
}

export default ProductScreen
