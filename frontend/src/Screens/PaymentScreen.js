import { StrictMode, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import CartCycle from '../Components/CartCycle.js'
import FormComponent from '../Components/FormComponent.js'
import { savePaymentMethod } from '../actions/userProfileActions.js'
import { useDispatch } from 'react-redux'

const PaymentScreen = ({ history }) => {
  const [method, setMethod] = useState('COD')

  const dispatch = useDispatch()

  const handleFormSubmission = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(method))
    history.push('/place-order')
  }

  return (
    <StrictMode>
      <CartCycle step1 step2 step3 />
      <FormComponent>
        <Form onSubmit={handleFormSubmission}>
          <Form.Label as="legend">Choose a payment method:</Form.Label>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="paypal"
            name="paymentMethod"
            value="PayPal"
            checked={method === 'PayPal'}
            onChange={(e) => setMethod(e.target.value)}
          ></Form.Check>
          <Form.Check
            type="radio"
            label="Cash On Delivery"
            id="cash"
            name="paymentMethod"
            value="COD"
            checked={method === 'COD'}
            onChange={(e) => setMethod(e.target.value)}
          ></Form.Check>
          <Button type="submit" className="btn-sm my-3">
            Save and Continue
          </Button>
        </Form>
      </FormComponent>
    </StrictMode>
  )
}

export default PaymentScreen
