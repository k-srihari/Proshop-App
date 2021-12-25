import { StrictMode, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Image, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { editProductAction, imageUploadAction } from '../actions/adminActions'
import fetchProductDetails from '../actions/fetchProductDetailsAction'
import listProducts from '../actions/fetchProductsAction'
import LoadingSpinner from '../Components/LoadingSpinner'
import { PRODUCT_EDIT_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ history, match }) => {
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const { isLoading, product, error } = useSelector(
    (state) => state.productDetailsReducer
  )
  const {
    isLoading: imageUploading,
    newImagePath,
    error: errorUploading,
  } = useSelector((state) => state.uploadImageReducer)
  const {
    isLoading: isEditing,
    newProduct,
    error: errorEditing,
  } = useSelector((state) => state.editProductReducer)
  const dispatch = useDispatch()

  const nameField = useRef('')
  const descriptionField = useRef('')
  const brandField = useRef('')
  const categoryField = useRef('')
  const priceField = useRef(0)
  const stocksField = useRef(0)

  const [imagePath, setImagePath] = useState('')

  useEffect(() => {
    if (!userInfo) {
      history.push(`/login?redirect=/admin/products/${match.params.id}/edit`)
    }
    if (!product || product._id !== match.params.id || newProduct) {
      if (newProduct) dispatch({ type: PRODUCT_EDIT_RESET })
      dispatch(fetchProductDetails(match.params.id))
      dispatch(listProducts())
    }
    if (product && descriptionField.current) {
      nameField.current.value = product.productName
      descriptionField.current.value = product.description
      brandField.current.value = product.brand
      categoryField.current.value = product.category
      priceField.current.value = product.price
      stocksField.current.value = product.stocksCount
      if (newImagePath) setImagePath(newImagePath)
      else setImagePath(product.productImage)
    }
  }, [match, userInfo, product, dispatch, history, newImagePath, newProduct])

  const handleImageUpload = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    dispatch(imageUploadAction(file))
  }

  const handleUpdateSubmission = (e) => {
    e.preventDefault()
    const reqBody = {
      name: nameField.current.value,
      image: imagePath,
      brand: brandField.current.value,
      category: categoryField.current.value,
      price: priceField.current.value,
      description: descriptionField.current.value,
      stocks: stocksField.current.value,
    }
    dispatch(editProductAction(product._id, reqBody))
  }

  return (
    <StrictMode>
      <LinkContainer to={'/admin/products/all'}>
        <Button variant="light" className="btn-sm mb-3">
          Go Back
        </Button>
      </LinkContainer>
      {userInfo && !userInfo.isAdmin ? (
        <h3 className="text-danger">
          You're not authorized as an admin to view this page!
        </h3>
      ) : isLoading || isEditing ? (
        <LoadingSpinner />
      ) : error || errorEditing ? (
        <p className="text-danger">{error || errorEditing}</p>
      ) : (
        product && (
          <>
            <h4>Product [{product._id}]</h4>
            <Form className="my-2" onSubmit={handleUpdateSubmission}>
              <Form.Group controlId="product-name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control type="text" ref={nameField} />
              </Form.Group>
              <Form.Group controlId="product-description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} ref={descriptionField} />
              </Form.Group>
              <Form.Group controlId="product-image">
                <Form.Label>Image</Form.Label>
                <Row>
                  {
                    <Col md={4}>
                      {imageUploading ? (
                        <LoadingSpinner />
                      ) : errorUploading ? (
                        <p className="text-danger">{errorUploading}</p>
                      ) : (
                        imagePath && <Image src={imagePath} fluid rounded />
                      )}
                    </Col>
                  }
                  <Col md={8}>
                    <Form.Control
                      type="file"
                      onChange={handleImageUpload}
                    ></Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" ref={brandField} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="product-category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" ref={categoryField} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Stock Available</Form.Label>
                    <Form.Control type="number" ref={stocksField} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      step={'0.01'}
                      ref={priceField}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" variant="dark" className="btn-md my-2">
                Save Changes
              </Button>
            </Form>
          </>
        )
      )}
    </StrictMode>
  )
}

export default ProductEditScreen
