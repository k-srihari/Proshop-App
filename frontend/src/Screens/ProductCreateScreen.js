import { StrictMode, useEffect, useRef, useState } from 'react'
import { Button, Form, Image, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { createProductAction, imageUploadAction } from '../actions/adminActions'
import listProducts from '../actions/fetchProductsAction'
import Spinner from '../Components/LoadingSpinner'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductCreateScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userAuthenticationReducer)
  const { isLoading, product, error } = useSelector(
    (state) => state.createProductReducer
  )
  const {
    isLoading: imageUploading,
    newImagePath,
    error: errorUploading,
  } = useSelector((state) => state.uploadImageReducer)

  const doDispatch = useDispatch()

  const nameField = useRef('')
  const descriptionField = useRef('')
  const brandField = useRef('')
  const categoryField = useRef('')
  const priceField = useRef(0)
  const stocksField = useRef(0)

  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (!userInfo)
      return history.push('/login?redirect=/admin/products/add-new')
    if (newImagePath) setImageUrl(newImagePath)
    if (product) {
      doDispatch({ type: PRODUCT_CREATE_RESET })
      doDispatch(listProducts())
      history.push(`/admin/products/all`)
    }
  }, [history, userInfo, newImagePath, product, doDispatch])

  const handleImageUpload = (e) => {
    e.preventDefault()
    const imageFile = e.target.files[0]
    doDispatch(imageUploadAction(imageFile))
  }

  const handleFormSubmission = (e) => {
    e.preventDefault()
    const newProductData = {
      name: nameField.current.value,
      image: imageUrl,
      description: descriptionField.current.value,
      brand: brandField.current.value,
      category: categoryField.current.value,
      price: priceField.current.value,
      stocks: stocksField.current.value,
    }
    doDispatch(createProductAction(newProductData))
  }

  return (
    <StrictMode>
      <LinkContainer to={'/admin/products/all'}>
        <Button variant="light" className="mb-3 btn-sm">
          Go Back
        </Button>
      </LinkContainer>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-danger">{error.message}</p>
      ) : (
        <>
          <h3>Add New Product</h3>
          <Form onSubmit={handleFormSubmission}>
            <Form.Group controlId="product-name">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" ref={nameField} />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Product Description</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descriptionField} />
            </Form.Group>
            <Form.Group controlId="product-image">
              <Form.Label>Image</Form.Label>
              <Row>
                <Col md={4}>
                  {imageUploading ? (
                    <Spinner />
                  ) : errorUploading ? (
                    <p className="text-danger">{errorUploading}</p>
                  ) : imageUrl ? (
                    <Image src={imageUrl} fluid rounded />
                  ) : (
                    <p className="text-warning">No Image Added Yet!</p>
                  )}
                </Col>
                <Col md={8}>
                  <Form.Control type="file" onChange={handleImageUpload} />
                </Col>
              </Row>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group controlId="product-brand">
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
                <Form.Group controlId="product-stock">
                  <Form.Label>Stock Available</Form.Label>
                  <Form.Control type="number" ref={stocksField} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="product-category">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" step={0.01} ref={priceField} />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="dark" className="btn-md my-3">
              Add
            </Button>
          </Form>
        </>
      )}
    </StrictMode>
  )
}

export default ProductCreateScreen
