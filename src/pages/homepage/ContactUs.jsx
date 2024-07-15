import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./ContactUs.css"; // Import the CSS file

const ContactUs = () => {
  return (
    <Container className="contact-us mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Contact us</h2>
          <p>
            We’re here to help and answer any questions you might have. We look
            forward to hearing from you!
          </p>
          <p>
            <FaMapMarkerAlt /> <a href="https://www.google.com/maps/search/?api=1&query=Kathmandu+Nepal+Dhapasi-height" target="_blank" rel="noopener noreferrer">Kathmandu/Nepal, Dhapasi-height</a>
          </p>
          <p>
            <FaPhoneAlt /> <a href="tel:+9779865555215">+977 9865555215</a>
          </p>
          <p>
            <FaEnvelope /> <a href="mailto:kritimakhatri123@gmail.com">kritimakhatri123@gmail.com</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
