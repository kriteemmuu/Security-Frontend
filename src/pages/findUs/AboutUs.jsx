
import { Container, Row, Col } from 'react-bootstrap';

function AboutUs() {
  return (
    <Container>
      <Row className="my-5">
        <Col md={12}>
          <h2>About Diva Maternity</h2>
          <p>Welcome to Diva Maternity, where we support every step of your motherhood journey. Founded with the passion to assist mothers and their newborns, we provide a comprehensive range of products designed to cater to all needs during and post-pregnancy.</p>
          <p>At Diva Maternity, we understand the challenges of pregnancy and early motherhood. Our products are carefully selected to ensure safety, comfort, and style. We believe in empowering mothers with quality products and information to make informed choices for themselves and their babies.</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h3>Our Products</h3>
          <p>Our product range includes:</p>
          <ul>
            <li><strong>Maternity Wear:</strong> Comfortable, stylish, and adaptable to your changing body.</li>
            <li><strong>Nursing Essentials:</strong> From breast pumps to nursing bras, everything you need for breastfeeding success.</li>
            <li><strong>Baby Gear:</strong> High-quality strollers, car seats, and baby carriers designed for safety and comfort.</li>
            <li><strong>Postpartum Care:</strong> Products to support recovery and wellness after childbirth.</li>
          </ul>
        </Col>
        <Col md={6}>
          <h3>Why Choose Us?</h3>
          <p>Choosing Diva Maternity means you are supported by a team that cares deeply about your well-being and the well-being of your baby. We are committed to:</p>
          <ul>
            <li>Providing the highest quality products.</li>
            <li>Ensuring a seamless shopping experience.</li>
            <li>Offering expert advice and support throughout your motherhood journey.</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
