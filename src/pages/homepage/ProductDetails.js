import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { singleProductDetails } from "../../apis/Api.js";
import { toast } from "react-toastify";
import "./ProductDetails.css";
import AddRatingReview from "../addRatingReview/AddRatingReview.jsx";
import PropTypes from "prop-types";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - filledStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array(filledStars)
        .fill()
        .map((_, index) => (
          <span key={index} className="star filled">
            ★
          </span>
        ))}
      {halfStar && <span className="star half">★</span>}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <span key={index} className="star empty">
            ☆
          </span>
        ))}
    </div>
  );
};
StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

const ProductDetails = ({ updateCartCount }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await singleProductDetails(id);
        if (response.data && response.data.data) {
          setProduct(response.data.data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product.inStock > 0) {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        toast.error("User not logged in!");
        return;
      }

      const userId = user._id;

      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProductIndex = cart.findIndex(
        (item) => item.userId === userId && item.productId === product._id
      );

      if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push({
          userId: userId,
          productId: product._id,
          productName: product.productName,
          productPrice: product.productPrice,
          productImage: product.productImage,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      toast.success("Item added to cart!");
      if (updateCartCount) {
        updateCartCount();
      }
    } else {
      return toast.warn("Product is Out of Stock");
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h2>Product not found</h2>
      </Container>
    );
  }

  return (
    <>
      <Container style={{ marginTop: "4rem" }}>
        <Row className="mt-4">
          <span>
            {product.productName}/{product.productCategory}
          </span>
          <Col md={6}>
            <img
              src={`https://localhost:3001/products/${product.productImage}`}
              alt={product.productName}
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <h2>{product.productName}</h2>
            <p style={{ fontSize: "20px" }}>Price: Rs {product.productPrice}</p>

            <p>{product.productDescription}</p>
            <div className="d-flex flex-column align-items-start mb-3">
              <div className="d-flex align-items-center">
                <StarRating rating={product?.ratings || 0} />
                <span className="ml-2">({product?.numOfReviews})</span>
              </div>
            </div>
            <h2
              style={{
                fontSize: "16px",
                color: product.inStock ? "green" : "red",
              }}
            >
              Stock: {product.inStock ? "InStock" : "OutOfStock"}
            </h2>

            <Button
              variant="success"
              className="custom-btn mt-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
      <div style={{ marginTop: "4rem" }}>
        <AddRatingReview id={id} />
      </div>
    </>
  );
};

ProductDetails.propTypes = {
  updateCartCount: PropTypes.func.isRequired,
};

export default ProductDetails;
