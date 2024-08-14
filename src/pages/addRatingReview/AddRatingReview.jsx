import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { addRatingReview, getAllReviews } from "../../apis/Api";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const AddRatingReview = ({ id }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  let token = localStorage.getItem("token")

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Fields must be filled!");
      return;
    }

    setIsLoading(true);
    try {
      if(token){
          const data = { productId: id, rating, comment };
          await addRatingReview(data);
          toast.success("Review added successfully!");
          setRating("");
          setComment("");
          await fetchedData();
      }else{
        toast.error("Please Login first")
        return
      }
    } catch (error) {
      toast.error("Failed to add review. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchedData = async () => {
    try {
      const res = await getAllReviews(id);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedData();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        style={{ color: index < rating ? "#ffc107" : "#e4e5e9" }}
      >
        ★
      </span>
    ));
  };

  return (
    <Container>
      <Row>
        {/* Left Side: Reviews */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>Ratings and Reviews</Card.Header>
            <Card.Body>
              {reviews.length === 0 ? (
                <p>No ratings or reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review._id} style={{ marginBottom: "10px" }}>
                    <div>
                      <strong>{`${review.firstName} ${review.lastName}`}</strong>
                    </div>
                    <div>{renderStars(review.rating)}</div>
                    <div>{review.comment}</div>
                  </div>
                ))
              )}
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
  id: PropTypes.string.isRequired,
};

export default AddRatingReview;
