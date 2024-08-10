import KhaltiCheckout from "khalti-checkout-web";
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
// import { createOrder } from "../../../apis/Api";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      if (paymentMethod === "Khalti") {
        initiateKhaltiPayment();
      } else if (paymentMethod === "Cash On Delivery") {
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

        // Replace with your actual API endpoint
        await axios.post(
          `http://localhost:3001/api/order/create-Order`,
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

  const initiateKhaltiPayment = () => {
    const checkout = new KhaltiCheckout({
      publicKey: "test_public_key_617c4c6fe77c441d88451ec1408a0c0e",
      productIdentity: "1234567890",
      productName: "Furniture Fusion",
      productUrl: "http://localhost:3000",
      eventHandler: {
        onSuccess(payload) {
          const data = {
            token: payload.token,
            amount: payload.amount,
          };

          const config = {
            headers: {
              Authorization: "test_secret_key_3f78fb6364ef4bd1b5fc670ce33a06f5",
            },
          };

          axios
            .post("https://khalti.com/api/v2/payment/verify/", data, config)
            .then((response) => {
              console.log(response.data);
              toast.success("Payment Successful!");
              // Add logic to handle successful payment and order confirmation
            })
            .catch((error) => {
              console.log(error);
              toast.error("Payment Verification Failed.");
            });
        },
        onError(error) {
          console.log(error);
        },
        onClose() {
          console.log("widget is closing");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    });
    checkout.show({ amount: grandTotal * 100 });
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
                {paymentMethod && (
                  <div className="mt-4">
                    <h5>
                      Your full and final payment is Rs {grandTotal.toFixed(2)}
                    </h5>
                    <Button
                      variant="primary"
                      type="submit"
                      className="mt-2"
                      disabled={isLoading}
                    >
                      {isLoading && <span>Loading....</span>}
                      {paymentMethod === "Cash On Delivery"
                        ? "Place Order"
                        : "Proceed with Khalti"}
                    </Button>
                  </div>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
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
                <Col>Tax:</Col>
                <Col>Rs {DST.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping Charge:</Col>
                <Col>Rs {shippingCharge}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Grand Total:</Col>
                <Col>Rs {grandTotal.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
