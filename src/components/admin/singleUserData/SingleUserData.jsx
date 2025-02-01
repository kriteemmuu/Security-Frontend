import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleUser } from "../../../apis/Api";
import { Card, ListGroup, Image, Container, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const SingleUserData = () => {
  const [singleUserData, setSingleUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await getSingleUser(id);
        setSingleUserData(res.data.product);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { avatar, email, firstName, lastName, phone, role, createdAt } =
    singleUserData;

  return (
    <Container style={{ marginTop: "2rem" }}>
      <Row className="flex">
        <Col md={6}>
          <Card className="mb-4">
            <div className="d-flex align-items-center">
              <Link
                to="/admin_dashboard/all-usersList"
                className="text-decoration-none me-3"
              >
                <FaArrowLeft />
              </Link>
              <h2 className="mb-0">Add Product</h2>
            </div>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4} className="text-center">
                  <Image
                    src={`https://localhost:3001/profile/${avatar}`}
                    roundedCircle
                    fluid
                    style={{ width: "150px", height: "150px" }}
                  />
                </Col>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>First Name:</strong> {firstName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Last Name:</strong> {lastName}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Email:</strong> {email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Phone:</strong> {phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Role:</strong> {role}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Date Joined:</strong>{" "}
                      {new Date(createdAt).toLocaleDateString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleUserData;
