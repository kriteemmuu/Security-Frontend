import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Image1 from "../../assets/images/pillow.png";
import WomenImg from "../../assets/images/onezie.png";
import Women2Img from "../../assets/images/maternity.png";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleViewProducts = (product) => {
    navigate("/product-details", { state: product });
  };

  const products = [
    {
      name: "Baby Essentials",
      price: 500,
      image: Image1,
    },
    {
      name: "Baby Products",
      price: 500,
      image: WomenImg,
    },
    {
      name: "Women's Health",
      price: 500,
      image: Women2Img,
    }
  ];

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Welcome to Diva Maternity</h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <h6>
            Diva Maternity is your go-to online platform for category-based
            products catering to women&apos;s and baby products. We offer a
            convenient online ordering system to meet all your maternity and baby
            needs.
          </h6>
        </Col>

        <Col>
          <h6>
            Explore our wide range of products designed to make your maternity
            journey easier and more enjoyable.
          </h6>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <h3>Our Products</h3>
        </Col>
      </Row>

      <Row className="mt-3">
        {products.map((product, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="card-custom">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="card-img-custom"
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewProducts(product)}
                >
                  View Products
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
