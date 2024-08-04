import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { singleProductDetails } from "../../apis/Api.js";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import "./ProductDetails.css";
import AddRatingReview from "../addRatingReview/AddRatingReview.jsx";

const ProductDetails = () => {
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
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product._id
    );
    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({
        id: product._id,
        productName: product.productName,
        productPrice: product.productPrice,
        productImage: product.productImage,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item added to cart!");
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
              src={`http://localhost:3001/products/${product.productImage}`}
              alt={product.productName}
              className="img-fluid"
            />
          </Col>
          <Col md={6}>
            <h2>{product.productName}</h2>
            <p>Price: Rs {product.productPrice}</p>
            <p>{product.productDescription}</p>
            <div className="d-flex flex-column align-items-start mb-3">
              <div className="d-flex">
                {[...Array(5)].map((star, index) => (
                  <FaStar key={index} color="gold" />
                ))}
              </div>
            </div>
            <Button
              variant="success"
              className="custom-btn"
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

export default ProductDetails;
