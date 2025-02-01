import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { otpVerifyAccount, resendOtp } from "../../apis/Api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
    const userId = localStorage.getItem("userId") 
    ? JSON.parse(localStorage.getItem("userId")) 
    : null;
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpNumber = parseInt(otp.join(""));
    if (otpNumber && otp.join("").length === 6) {
      setIsSubmitting(true);
      try {
        const res = await otpVerifyAccount({ otp: otpNumber,userId:userId });
        setIsSubmitting(false);

        if (res.data.success) {
          toast.success("Account verified successfully!");
          navigate("/login");
        }
      } catch (error) {
        setIsSubmitting(false);

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
      }
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);

    try {
      const res = await resendOtp({ userId });
      setIsResending(false);

      if (res.data.success) {
        toast.success("OTP resent successfully! check email");
        setOtp(["", "", "", "", "", ""]);
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setIsResending(false);
      toast.error("An error occurred while resending OTP.");
    }
  };

  return (
    <Container
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      className="mt-5"
    >
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Verify Your Account</h2>
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group>
              <Row className="g-2 justify-content-center">
                {otp.map((digit, index) => (
                  <Col
                    key={index}
                    sm={2}
                    className="d-flex justify-content-center"
                  >
                    <Form.Control
                      id={`otp-${index}`}
                      type="number"
                      value={digit}
                      onChange={(e) => handleChange(e, index)}
                      maxLength={1}
                      className="text-center"
                    />
                  </Col>
                ))}
              </Row>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="w-100 mt-3"
              disabled={isSubmitting || otp.join("").length !== 6}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>

            <Button
              variant="link"
              className="mt-3 d-block w-100 text-center"
              onClick={handleResendOtp}
              disabled={isResending}
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyAccount;
