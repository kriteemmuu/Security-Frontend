import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getReviewsApi,
  getSingleProductApi,
  submitReviewApi,
} from "../../apis/Api.js";

const Review = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productResponse = await getSingleProductApi(productId);
        setProduct(productResponse.data.product);

        const reviewsResponse = await getReviewsApi(productId);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error("Error fetching product or reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [productId]);

  const handleSaveReview = async () => {
    setSubmitting(true);
    const reviewData = {
      productId,
      rating,
      review,
      userName,
    };

    try {
      const response = await submitReviewApi(reviewData);
      toast.success("Review saved successfully!");
      setReviews([...reviews, response.data.review]);
      setRating(5);
      setReview("");
      setUserName("");
    } catch (error) {
      console.log("Error saving review:", error);
      toast.error("Failed to save review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );

  if (!product) return <div>Product not found</div>;

  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 5;

  return (
    <Container className="mt-5">
      <ToastContainer />
      <Row>
        <Col md={6}>
          <h2>Review for {product.productName}</h2>
          <img
            src={`http://localhost:3001/products/${product.productImage}`}
            alt={product.productName}
            className="img-fluid mb-3"
          />
          <h3>Average Rating: {averageRating.toFixed(1)}</h3>
          <div className="d-flex mb-3">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <FaStar
                  key={index}
                  size={30}
                  color={ratingValue <= averageRating ? "gold" : "gray"}
                />
              );
            })}
          </div>
        </Col>
        <Col md={6}>
          <h3>Your Rating:</h3>
          <div className="d-flex mb-3">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    style={{ display: "none" }}
                  />
                  <FaStar
                    size={30}
                    color={ratingValue <= (hover || rating) ? "gold" : "gray"}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    style={{ cursor: "pointer" }}
                  />
                </label>
              );
            })}
          </div>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSaveReview}
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Save Review"}
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>All Reviews:</h3>
          {reviews.map((review, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <div className="d-flex">
                  {[...Array(5)].map((star, i) => (
                    <FaStar
                      key={i}
                      size={20}
                      color={i < review.rating ? "gold" : "gray"}
                    />
                  ))}
                </div>
                <Card.Text>
                  <strong>{review.userName}</strong>: {review.review}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Review;



