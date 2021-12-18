import { StrictMode, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import CartCycle from '../Components/CartCycle.js'
import FormComponent from '../Components/FormComponent.js'
import { savePaymentMethod } from '../actions/userProfileActions.js'
import { useDispatch } from 'react-redux'

const PaymentScreen = ({ history }) => {
  const [method, setMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const handleFormSubmission = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(method))
    history.push('/place-order')
    console.log(method)
  }

  return (
    <StrictMode>
      <CartCycle step1 step2 step3 />
      <FormComponent>
        <Form onSubmit={handleFormSubmission}>
          <Form.Group controlId="payment-method">
            <Form.Label as="legend">Choose a payment method:</Form.Label>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>
          <Button type="submit">Save and Continue</Button>
        </Form>
      </FormComponent>
    </StrictMode>
  )
}

export default PaymentScreen
