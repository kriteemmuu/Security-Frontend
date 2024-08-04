import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { addRatingReview } from "../../apis/Api";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const AddRatingReview = ({ id }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Fields must be filled!");
      return;
    }

    setIsLoading(true);
    try {
      const data = { productId: id, rating, comment };
      await addRatingReview(data);
      toast.success("Review added successfully!");
      setRating("");
      setComment("");
    } catch (error) {
      toast.error("Failed to add review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Row>
        {/* Left Side: Reviews */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Ratings and Reviews</Card.Header>
            <Card.Body>
              <p>No ratings or reviews yet.</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side: Add Rating and Review Form */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Add Your Rating and Review</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formRating">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select Rating</option>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <option key={star} value={star}>{`${star} Star${
                        star > 1 ? "s" : ""
                      }`}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formReview">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

AddRatingReview.propTypes = {
  id: PropTypes.string,
};

export default AddRatingReview;
