import { useState } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const CartDetails = () => {
  // Retrieve cart items from localStorage
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Function to handle item removal from cart
  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={2}>
                      <img
                        src={`http://localhost:3001/products/${item.productImage}`}
                        alt={item.productName}
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={6}>
                      <p>{item.productName}</p>
                      <p>Price: Rs {item.productPrice}</p>
                    </Col>
                    <Col md={3}>
                      <p>Quantity: {item.quantity}</p>
                    </Col>
                    <Col md={1}>
                      <FaTrash
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleRemoveFromCart(item.id)}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <h2>Order Summary</h2>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Total Items:</Col>
                <Col>{cart.reduce((acc, item) => acc + item.quantity, 0)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total Price:</Col>
                <Col>Rs {totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="success" block>
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CartDetails;
