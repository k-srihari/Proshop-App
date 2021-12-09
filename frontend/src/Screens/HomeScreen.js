import { StrictMode, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import fetchProductsAction, {
  requestProducts,
  getProducts,
} from '../actions/fetchProductsAction.js'
import LoadingSpinner from '../Components/LoadingSpinner.js'
import Product from '../Components/Product'

const HomeScreen = () => {
  const { products, isLoading, error } = useSelector(
    (state) => state.productsReducer
  )
  const doDispatch = useDispatch()

  useEffect(() => {
    doDispatch(requestProducts())
    doDispatch(getProducts())
    // doDispatch(fetchProductsAction())
  }, [doDispatch])

  return (
    <StrictMode>
      <Row className="my-4">
        <h2>LATEST PRODUCTS</h2>
        {isLoading ? (
          <LoadingSpinner />
        ) : products ? (
          products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))
        ) : (
          <h3>{error}</h3>
        )}
      </Row>
    </StrictMode>
  )
}

export default HomeScreen
