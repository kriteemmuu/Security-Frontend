import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      className="mt-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Row className="justify-content-center">
        {/* Adjusted column width */}
        <Col md={12} className="text-center">
          <Card className="p-4 shadow">
            <Card.Body>
              <FaExclamationTriangle size={80} color="red" className="mb-4" />
              <h1 className="mb-3">404 - Page Not Found</h1>
              <h2 className="lead mb-4">
                Oops! The page you looking for does not exist
              </h2>
              <Button variant="primary" onClick={handleGoHome}>
                Go to Home
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;
