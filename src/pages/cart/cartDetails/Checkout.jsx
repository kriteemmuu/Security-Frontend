import { useState } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { cart, totalPrice } = location.state;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    paymentMethod: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your submission logic here

      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order.");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2>Checkout</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    size="sm"
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    size="sm"
                  />
                </Form.Group>
                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    size="sm"
                  />
                </Form.Group>
                <Form.Group controlId="formPaymentMethod" className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    as="select"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                    size="sm"
                  >
                    <option value="">Select...</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="khalti">Khalti</option>
                    <option value="fonepay">Fonepay</option>
                    <option value="imepay">IME Pay</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 btn-sm">
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h3>Order Summary</h3>
              <ListGroup variant="flush">
                {cart.map((item) => (
                  <ListGroup.Item key={item.id}>
                    <Row>
                      <Col md={6}>{item.productName}</Col>
                      <Col md={3}>Qty: {item.quantity}</Col>
                      <Col md={3}>Price: Rs {item.productPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>Rs {totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;




// import { useState } from "react";
// import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';
// import PropTypes from 'prop-types';

// const LocationMarker = ({ setFormData, formData }) => {
//   const [position, setPosition] = useState(null);

//   useMapEvents({
//     click(e) {
//       setPosition(e.latlng);
//       const { lat, lng } = e.latlng;
//       setFormData({ ...formData, location: `${lat}, ${lng}` });
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}></Marker>
//   );
// };

// LocationMarker.propTypes = {
//   setFormData: PropTypes.func.isRequired,
//   formData: PropTypes.object.isRequired,
// };

// const Checkout = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     location: "",
//     paymentMethod: "",
//   });
//   const [showMap, setShowMap] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Add your submission logic here

//       toast.success("Order placed successfully!");
//     } catch (error) {
//       toast.error("Failed to place order.");
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-md-center">
//         <Col md={6}>
//           <h2>Checkout</h2>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="formName">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formPhone" className="mt-3">
//               <Form.Label>Phone Number</Form.Label>
//               <Form.Control
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formLocation" className="mt-3">
//               <Form.Label>Location</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 required
//               />
//               <Button
//                 variant="secondary"
//                 className="mt-2"
//                 onClick={() => setShowMap(true)}
//               >
//                 Set on Map
//               </Button>
//             </Form.Group>
//             <Form.Group controlId="formPaymentMethod" className="mt-3">
//               <Form.Label>Payment Method</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="paymentMethod"
//                 value={formData.paymentMethod}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select...</option>
//                 <option value="cod">Cash on Delivery</option>
//                 <option value="khalti">Khalti</option>
//               </Form.Control>
//             </Form.Group>
//             <Button variant="primary" type="submit" className="mt-3">
//               Place Order
//             </Button>
//           </Form>
//         </Col>
//       </Row>

//       <Modal show={showMap} onHide={() => setShowMap(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Select Location</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <MapContainer center={[27.7172, 85.3240]} zoom={13} style={{ height: "400px", width: "100%" }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <LocationMarker setFormData={setFormData} formData={formData} />
//           </MapContainer>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowMap(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Checkout;
