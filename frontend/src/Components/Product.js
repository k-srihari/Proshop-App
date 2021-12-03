import { StrictMode } from "react"
import { Card } from "react-bootstrap"
import Rating from "./Rating"

const Product = ({product}) => {
    return (
        <StrictMode>
            <Card className='p-3 my-3 rounded'>
                <a href={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top"/>
                </a>
                <Card.Body>
                    <a href={`/product/${product._id}`}>
                        <Card.Title as='div'>
                                <strong>{product.name}</strong>
                        </Card.Title>
                    </a>
                    <Card.Text as='div' className="my-3">
                        <Rating 
                        value={product.rating} 
                        rating={product.numReviews > 0 ? `${product.numReviews} ratings` : 'No reviews yet!'}
                        />
                    </Card.Text>
                    <Card.Text as='h3'>
                        $ {product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </StrictMode>
    )
}

export default Product
