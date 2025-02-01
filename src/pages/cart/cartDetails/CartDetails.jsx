// export default CartDetails;
import { useState } from "react";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const navigate = useNavigate();

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

  // Function to increment the quantity of an item
  const incrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Function to decrement the quantity of an item
  const decrementQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  // Calculate DST tax (2%) and add shipping charge (Rs 100)
  const DST = totalPrice * 0.02;
  const shippingCharge = 100;
  const grandTotal = totalPrice + DST + shippingCharge;

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
                        src={`https://localhost:3001/products/${item.productImage}`}
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
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => incrementQuantity(item.id)}
                      >
                        <FaPlus />
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => decrementQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
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
                <Col>Rs {totalPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>DST (2%):</Col>
                <Col>Rs {DST.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Charge:</Col>
                <Col>Rs {shippingCharge.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Grand Total:</Col>
                <Col>Rs {grandTotal.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="success"
                block
                onClick={() =>
                  navigate("/check-out", { state: { cart, grandTotal } })
                }
              >
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
