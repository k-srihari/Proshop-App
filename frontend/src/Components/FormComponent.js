import { Col, Container, Row } from 'react-bootstrap'

const FormComponent = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={12} md={8} lg={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormComponent
