import { StrictMode, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import axios from 'axios'

const HomeScreen = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data))
  }, [])

  return (
    <StrictMode>
      <Row className="my-4">
        <h2>LATEST PRODUCTS</h2>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </StrictMode>
  )
}

export default HomeScreen
