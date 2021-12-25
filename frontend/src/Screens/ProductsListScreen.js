import { StrictMode, useEffect } from 'react'
import { Button, Stack, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteProductAction } from '../actions/adminActions'
import listProducts from '../actions/fetchProductsAction'
import LoadingSpinner from '../Components/LoadingSpinner.js'
import { PRODUCT_DELETE_RESET } from '../constants/productConstants'

const ProductsListScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const { products, error, isLoading } = useSelector(
    (state) => state.productsReducer
  )
  const { isSuccess: deleteSuccess } = useSelector(
    (state) => state.deleteProductReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=/admin/products/all')
    }
    if (!products || products.length === 0 || deleteSuccess) {
      dispatch({ type: PRODUCT_DELETE_RESET })
      dispatch(listProducts())
    }
  }, [userInfo, history, products, dispatch, deleteSuccess])

  const handleDeleteProduct = (id) => {
    if (
      window.confirm('You sure you want to delete the product [' + id + ']?')
    ) {
      dispatch(deleteProductAction(id))
    }
  }

  return (
    <StrictMode>
      <LinkContainer to={'/'}>
        <Button className="btn-sm mb-3" variant="light">
          Home
        </Button>
      </LinkContainer>
      {userInfo && !userInfo.isAdmin ? (
        <h3 className="text-danger">
          Sorry, you're not authorized as an Admin to view this page!
        </h3>
      ) : isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
          <Stack direction="horizontal">
            <h2>Products List</h2>
            <LinkContainer to={'/admin/products/add-new'} className="ms-auto">
              <Button variant="dark">+ Add New</Button>
            </LinkContainer>
          </Stack>
          <Table responsive striped bordered hover className="table-sm my-3">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stocks</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.productName}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.stocksCount}</td>
                    <td>{product.category}</td>
                    <td>
                      <LinkContainer to={`/admin/products/${product._id}/edit`}>
                        <Button variant="dark" className="btn-sm">
                          <i className="fas fa-edit" />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <i className="fas fa-trash" />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </StrictMode>
  )
}

export default ProductsListScreen
