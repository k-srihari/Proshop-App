import { StrictMode } from "react"
import products from '../products'
import { Row, Col } from "react-bootstrap";
import Product from "../Components/Product";

const HomeScreen = () => {
    return (
        <StrictMode>
            <Row>
                <h2>LATEST PRODUCTS</h2>
                {products.map((product) => (
                    <Col sm={12} md={6} lg={4}>
                        <Product key={product._id} product={product}/>
                    </Col>
                ))}
            </Row>
        </StrictMode>
    )
}

export default HomeScreen
