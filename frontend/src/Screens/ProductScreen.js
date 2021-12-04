import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap'
import products from '../products'
import Rating from '../Components/Rating'
import { Link } from 'react-router-dom'

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id == match.params.id)

  return (
    <Container>
      <Link to="/" className="my-4 btn btn-light">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col sm={6} md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroupItem>
              <Rating value={product.rating} ratings={product.numReviews} />
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
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={product.countInStock === 0}
              >
                ADD TO CART
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductScreen
