import { StrictMode } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <StrictMode>
      <Card className="p-3 my-3 rounded">
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.productImage} variant="top" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.productName}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div" className="my-3">
            <Rating value={product.avgRating} ratings={product.reviewsCount} />
          </Card.Text>
          <Card.Text as="h3">$ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </StrictMode>
  )
}

export default Product
