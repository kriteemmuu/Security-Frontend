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
            <FaPhoneAlt /> <a href="tel:+9779864444444">+977 9864444444</a>
          </p>
          <p>
            <FaEnvelope /> <a href="mailto:mail@divanote.com">mail@divanote.com</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
