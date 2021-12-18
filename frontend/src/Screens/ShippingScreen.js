import { useSelector, useDispatch } from 'react-redux'
import { StrictMode, useRef, useState, useEffect } from 'react'
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap'
import FormComponent from '../Components/FormComponent.js'
import { saveShippingAddress } from '../actions/userProfileActions.js'
import CartCycle from '../Components/CartCycle.js'

const ShippingScreen = ({ history }) => {
  const shippingAddress = useSelector(
    (state) => state.cartReducer.shippingAddress
  )
  const userLoggedIn = useSelector(
    (state) => state.userAuthenticationReducer.userInfo
  )
  const dispatch = useDispatch()

  const addressField = useRef('')
  const cityField = useRef('')
  const countryField = useRef('')
  const postCodeField = useRef('')

  useEffect(() => {
    if (shippingAddress) {
      addressField.current.value = shippingAddress.address
      cityField.current.value = shippingAddress.city
      countryField.current.value = shippingAddress.country
      postCodeField.current.value = shippingAddress.postCode
    }
    if (!userLoggedIn) history.push('/login?redirect=/checkout')
  }, [shippingAddress, history, userLoggedIn])

  const [msg, setMsg] = useState('')

  const handleAddressSubmission = (e) => {
    e.preventDefault()

    dispatch(
      saveShippingAddress({
        address: addressField.current.value,
        city: cityField.current.value,
        country: countryField.current.value,
        postCode: postCodeField.current.value,
      })
    )

    setMsg('Shipping Address Added Successfully!')
  }

  return (
    <StrictMode>
      <CartCycle step1={true} step2={true} />
      <FormComponent>
        <h2 className="py-4">Shipping Address:</h2>
        {msg && <p className="text-success">{msg}</p>}
        <Form onSubmit={handleAddressSubmission}>
          <FormGroup controlId="address">
            <FormLabel>Street / Area / Landmark</FormLabel>
            <FormControl type="text" ref={addressField} />
          </FormGroup>
          <FormGroup controlId="city">
            <FormLabel>City</FormLabel>
            <FormControl type="text" ref={cityField} />
          </FormGroup>
          <FormGroup controlId="country">
            <FormLabel>Country</FormLabel>
            <FormControl type="text" ref={countryField} />
          </FormGroup>
          <FormGroup controlId="post-code">
            <FormLabel>Postal Code</FormLabel>
            <FormControl type="text" ref={postCodeField} />
          </FormGroup>
          <Button type="submit" variant="primary" className="my-4">
            Save
          </Button>
          <Button
            variant="primary"
            className="my-4 mx-4"
            onClick={() => history.push('/payment')}
          >
            Continue
          </Button>
        </Form>
      </FormComponent>
    </StrictMode>
  )
}

export default ShippingScreen
