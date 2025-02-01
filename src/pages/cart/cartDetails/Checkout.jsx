import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const orderItems = cart.map((item) => ({
    productName: item.productName,
    price: item.productPrice,
    quantity: item.quantity,
    productImg: item.productImage,
    product: item.productId,
  }));

  const user = JSON.parse(localStorage.getItem("user"));

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingInfo: {
      address: "",
      city: "",
      province: "",
      country: "",
      postalCode: "",
    },
    paymentMethod: "",
  });

  const {
    shippingInfo: { address, city, province, country, postalCode },
    paymentMethod,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({
      ...prevValue,
      shippingInfo: {
        ...prevValue.shippingInfo,
        [name]: value,
      },
      paymentMethod: name === "paymentMethod" ? value : prevValue.paymentMethod,
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const itemsPrice = totalPrice;
      const taxPrice = DST;
      const shippingPrice = shippingCharge;
      const grandTotal = itemsPrice + taxPrice + shippingPrice;

      const orderData = {
        shippingInfo: formData.shippingInfo,
        orderItems,
        user: user._id,
        paymentInfo: paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice: grandTotal,
      };

      if (paymentMethod === "Khalti") {
        await initiateKhaltiPayment(orderData);
      } else if (paymentMethod === "Cash On Delivery") {
        // Place order for Cash On Delivery
        await axios.post(
          `https://localhost:3001/api/order/create-Order`,
          orderData,
          config
        );

        toast.success("Order placed successfully!");
        navigate("/order-success");
        localStorage.removeItem("cart");
        setFormData({
          shippingInfo: {
            address: "",
            city: "",
            province: "",
            country: "",
            postalCode: "",
          },
          paymentMethod: "",
        });
      } else {
        toast.error("Please select a payment method.");
      }
    } catch (error) {
      toast.error("Failed to place order.");
    } finally {
      setIsLoading(false);
    }
  };

  const initiateKhaltiPayment = async (orderData) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const payload = {
        return_url: "https://localhost:3000/order-success",
        website_url: "https://localhost:3000",
        amount: parseInt(grandTotal) * 100,
        purchase_order_id: "Test123",
        purchase_order_name: "Test",
        customer_info: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
        },
      };

      const res = await axios.post("https://localhost:3001/khalti-pay", payload);
      const { payment_url, pidx } = res.data.data;

      window.open(payment_url, "_blank");

      // Retry mechanism to check payment status
      const retryPaymentStatusCheck = async (retryCount = 0) => {
        if (retryCount > 5) {
          toast.error("Payment not completed after multiple checks.");
          return;
        }

        try {
          const paymentStatus = await axios.get(
            `https://localhost:3001/payment-success?pidx=${pidx}`
          );

          if (paymentStatus.data.status === "Pending") {
            await axios.post(
              `https://localhost:3001/api/order/create-Order`,
              orderData,
              config
            );

            toast.success("Order placed successfully!");
            navigate("/order-success");
            localStorage.removeItem("cart");
            setFormData({
              shippingInfo: {
                address: "",
                city: "",
                province: "",
                country: "",
                postalCode: "",
              },
              paymentMethod: "",
            });
          } else {
            setTimeout(() => retryPaymentStatusCheck(retryCount + 1), 2000);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
        }
      };

      retryPaymentStatusCheck();
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment.");
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <h3>Personal Details</h3>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>FullName</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={`${user?.firstName} ${user?.lastName}`}
                    readOnly
                    size="md"
                  />
                </Form.Group>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={user?.email}
                    readOnly
                    size="md"
                  />
                </Form.Group>
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    value={user?.phone}
                    readOnly
                    size="md"
                  />
                </Form.Group>
                <h5 style={{ marginTop: "2rem" }}>Shipping Information</h5>
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange}
                    placeholder="Enter address"
                    required
                    size="md"
                  />
                </Form.Group>
                <Form.Group controlId="formCity" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={city}
                    onChange={handleChange}
                    placeholder="Enter City"
                    required
                    size="md"
                  />
                </Form.Group>
                <Form.Group controlId="formState" className="mb-3">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    name="province"
                    value={province}
                    onChange={handleChange}
                    placeholder="Enter Province"
                    required
                    size="md"
                  />
                </Form.Group>
                <Form.Group controlId="formCountry" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={country}
                    onChange={handleChange}
                    placeholder="Enter Country"
                    required
                    size="md"
                  />
                </Form.Group>
                <Form.Group controlId="formPinCode" className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="number"
                    name="postalCode"
                    value={postalCode}
                    onChange={handleChange}
                    required
                    placeholder="Enter Postal Code"
                    size="md"
                  />
                </Form.Group>
                <h5>Select Payment Method</h5>
                <Form.Group controlId="formPaymentMethod" className="mb-3">
                  <Form.Control
                    as="select"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Khalti">Khalti</option>
                  </Form.Control>
                </Form.Group>
                {paymentMethod === "Khalti" && (
                  <p className="text-warning">
                    Note: You will be redirected to the Khalti payment gateway.
                  </p>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                  className="d-flex align-items-center justify-content-center w-100"
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Processing...</span>
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <h3>Order Summary</h3>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Subtotal: <strong>Rs. {totalPrice.toFixed(2)}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  DST (2%): <strong>Rs. {DST.toFixed(2)}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Shipping: <strong>Rs. {shippingCharge.toFixed(2)}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>
                    Total: <strong>Rs. {grandTotal.toFixed(2)}</strong>
                  </h4>
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
