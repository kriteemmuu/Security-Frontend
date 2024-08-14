
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate("/user-order-history");
  };

  return (
    <Container
      className="mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center p-4">
            <Card.Body>
              <FaCheckCircle size={50} color="green" />
              <h2 className="mt-3">Your Order has been Placed Successfully!</h2>
              <p className="text-muted">
                Thank you for your purchase. You can view your order details or
                continue shopping.
              </p>
              <Button
                variant="primary"
                onClick={handleViewOrders}
                className="mt-3"
              >
                View Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSuccess;
