import { Card, Col, Container, Row } from "react-bootstrap";

const DashBoard = () => {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text>$10,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>150</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>75</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text>120</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
