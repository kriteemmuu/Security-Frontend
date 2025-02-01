import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { registerUserApi } from "../../apis/Api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [registerValue, setRegisterValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!registerValue.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!registerValue.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!/^\d{10}$/.test(registerValue.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerValue.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!registerValue.password.trim() || !passwordRegex.test(registerValue.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, including one uppercase, one lowercase, one number, and one special character.";
    }

    if (registerValue.password !== registerValue.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!registerValue.termsAccepted) {
      newErrors.termsAccepted = "You must agree to the Terms & Conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    registerUserApi(registerValue)
      .then((res) => {
        setLoading(false);
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          const convertedData = JSON.stringify(res.data.data._id);
          localStorage.setItem("userId", convertedData);
          navigate("/verify-account");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          toast.error(
            error.response.data.message ||
              `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          toast.error("No response from server. Please check your connection.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h2 className="text-center">Create Your Account</h2>
      <Form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={registerValue.firstName}
                onChange={(e) =>
                  setRegisterValue({ ...registerValue, firstName: e.target.value })
                }
              />
              {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={registerValue.lastName}
                onChange={(e) =>
                  setRegisterValue({ ...registerValue, lastName: e.target.value })
                }
              />
              {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={registerValue.phone}
            onChange={(e) =>
              setRegisterValue({ ...registerValue, phone: e.target.value })
            }
          />
          {errors.phone && <p className="text-danger">{errors.phone}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={registerValue.email}
            onChange={(e) =>
              setRegisterValue({ ...registerValue, email: e.target.value })
            }
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={registerValue.password}
            onChange={(e) =>
              setRegisterValue({ ...registerValue, password: e.target.value })
            }
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={registerValue.confirmPassword}
            onChange={(e) =>
              setRegisterValue({ ...registerValue, confirmPassword: e.target.value })
            }
          />
          {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label={
              <>
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms & Conditions
                </a>
              </>
            }
            checked={registerValue.termsAccepted}
            onChange={(e) =>
              setRegisterValue({ ...registerValue, termsAccepted: e.target.checked })
            }
          />
          {errors.termsAccepted && <p className="text-danger">{errors.termsAccepted}</p>}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          disabled={!registerValue.termsAccepted || loading}
        >
          {loading ? "Creating Account..." : "Create an Account"}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
