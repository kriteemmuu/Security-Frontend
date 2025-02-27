import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../apis/Api.js";
import "./Home.css";
import { toast } from "react-toastify";
import { FaHeart, FaEye } from "react-icons/fa";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProducts();

        if (response && response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else if (
          response &&
          response.data &&
          response.data.products &&
          Array.isArray(response.data.products)
        ) {
          setProducts(response.data.products);
        } else {
          toast.error("Unexpected response format.");
        }

        const savedWishlist =
          JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(savedWishlist.map((item) => item._id));
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Error fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToWishlist = (product) => {
    const existing = wishlist.find((id) => id === product._id);
    if (existing) {
      toast.info("Item already in Wishlist");
      return;
    }

    const updatedWishlist = [...wishlist, product._id];
    localStorage.setItem(
      "wishlist",
      JSON.stringify(
        updatedWishlist.map((id) => ({
          _id: id,
          ...products.find((p) => p._id === id),
        }))
      )
    );
    setWishlist(updatedWishlist);
    toast.success("Added to Wishlist!");
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col className="text-center">
          <h2 className="heading-text">
            Enhancing The Beauty Of Motherhood Through Fashion
          </h2>
          <img
            src="../assets/images/YAY.png"
            alt="Maternity Graphic"
            style={{ width: "100%", height: "auto", marginTop: "20px" }}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Our Products</h3>
        </Col>
      </Row>

      <Row className="mt-3">
        {loading ? (
          <Spinner animation="border" role="status" className="m-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Col md={4} className="mb-4" key={product._id}>
              <Card className="card-custom">
                <Card.Img
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                    display: "block", 
                    margin: "0 auto", 
                  }}
                  variant="top"
                  src={`http://localhost:3001/products/${product.productImage}`}
                  alt={product.productName}
                  className="card-img-custom"
                />
                <Card.Body>
                  <Card.Title>{product.productName}</Card.Title>
                  <Card.Text>Price: Rs {product.productPrice}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/product-details/${product._id}`}>
                      <Button
                        variant="primary"
                        className="d-flex align-items-center"
                      >
                        <FaEye className="mr-2" /> View Product
                      </Button>
                    </Link>
                    <Button
                      variant="link"
                      className={`text-${
                        wishlist.includes(product._id) ? "danger" : "secondary"
                      }`}
                      onClick={() => handleAddToWishlist(product)}
                    >
                      <FaHeart size={24} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <h1>No Data Found</h1>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Home;
