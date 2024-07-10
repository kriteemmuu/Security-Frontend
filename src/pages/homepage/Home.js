import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleViewProducts = (product) => {
    navigate("/product-details", { state: product });
  };

  const handleAddToCart = (product) => {
    console.log("Product added to cart:", product.name);
    // Here you can implement the logic to update the cart's state or make an API call
  };

  const products = [
    { name: "Sleeping pillow", price: 500, image: "/assets/images/pillow.png" },
    { name: "Baby onezie", price: 800, image: "/assets/images/onezie.png" },
    { name: "Women's Health", price: 350, image: "/assets/images/maternity.png" },
    { name: "Shampoo", price: 160, image: "/assets/images/shampoo.jpeg" },
    { name: "cactus", price: 250, image: "/assets/images/cactus.jpeg" },
    { name: "cradle", price: 2050, image: "/assets/images/cradle.jpg" },
    { name: "Pacifier", price: 500, image: "/assets/images/pacifier.jpg" },
    { name: "Multi-vitamin", price: 850, image: "/assets/images/vitamin.jpeg" },
    { name: "Exercise Ball", price: 2050, image: "/assets/images/ball.jpeg" },
    { name: "Massage Balm", price: 2600, image: "/assets/images/balm.webp" },
    { name: "Scar Gel", price: 1250, image: "/assets/images/scar.jpg" },
    { name: "Clothes", price: 2050, image: "/assets/images/Clothing.webp" },
  ];

  return (
    <Container>
      <Row className="mt-4">
        <Col><h2>Welcome to Diva Maternity</h2></Col>
      </Row>

      <Row>
        <Col><h6>Diva Maternity is your go-to online platform for category-based products catering to women&apos;s and baby products.</h6></Col>
        <Col><h6>Explore our wide range of products designed to make your maternity journey easier and more enjoyable.</h6></Col>
      </Row>

      <Row className="mt-4">
        <Col><h3>Our Products</h3></Col>
      </Row>

      <Row className="mt-3">
        {products.map((product, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="card-custom">
              <Card.Img variant="top" src={product.image} alt={product.name} className="card-img-custom" />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: Rs {product.price}</Card.Text>
                <Button variant="primary" onClick={() => handleViewProducts(product)}>
                  View Product
                </Button>
                <Button variant="success" className="btn-top-space " style={{marginLeft:10}} onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
