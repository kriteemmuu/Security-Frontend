import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Image1 from "../../assets/images/pillow.png";
import WomenImg from "../../assets/images/onezie.png";
import Women2Img from "../../assets/images/maternity.png";
import "./Home.css";

const Home = () => {
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
        <Col md={4} className="mb-4">
          <Card className="card-custom">
            <Card.Img
              variant="top"
              src={Image1}
              alt="Maternity Clothing"
              className="card-img-custom"
            />
            <Card.Body>
              <Card.Title>Baby Essentials</Card.Title>
              <Card.Text>
                Discover comfortable and stylish maternity clothing options.
              </Card.Text>
              <Button variant="primary">View Products</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="card-custom">
            <Card.Img
              variant="top"
              src={WomenImg}
              alt="Baby Products"
              className="card-img-custom"
            />
            <Card.Body>
              <Card.Title>Baby Products</Card.Title>
              <Card.Text>
                Find essential baby products for newborns and infants.
              </Card.Text>
              <Button variant="primary">View Products</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="card-custom">
            <Card.Img
              variant="top"
              src={Women2Img}
              alt="Women&apos;s Health"
              className="card-img-custom"
            />
            <Card.Body>
              <Card.Title>Women&apos;s Health</Card.Title>
              <Card.Text>
                Browse products that support women&apos;s health and well-being.
              </Card.Text>
              <Button variant="primary">View Products</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
