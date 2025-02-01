import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState({});
  const [isFetching,setIsFetching] = useState(false);

  const validatePassword = () => {
    let newErrors = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordData.oldPassword) {
      newErrors.oldPassword = "Old password is required.";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (!passwordRegex.test(passwordData.newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long, with uppercase, lowercase, number, and special character.";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setPasswordError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
        setFormData({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
        });
        setAvatarPreview(
          `http://localhost:3001/profile/${response.data.user.avatar}`
        );
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("avatar", avatar);

      await axios.put("http://localhost:3001/api/user/update", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword()) return;
    setIsFetching(true);


    try {

      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3001/api/user/change-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      localStorage.removeItem("user");
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error) {
      setIsFetching(false);
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
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              {user && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <div>
                    <Form.Group controlId="formProfileImage" className="mt-3">
                      <Form.Label>Profile Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="avatar"
                        onChange={handleFileInputChange}
                      />
                    </Form.Group>

                    {avatarPreview && (
                      <div className="mt-3">
                        <img
                          src={avatarPreview}
                          alt="Avatar Preview"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" type="submit" className="mt-3">
                      Update Profile
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Change Password</Card.Title>
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group controlId="formOldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordError.oldPassword && (
                    <p className="text-danger">{passwordError.oldPassword}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordError.newPassword && (
                    <p className="text-danger">{passwordError.newPassword}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordError.confirmPassword && (
                    <p className="text-danger">
                      {passwordError.confirmPassword}
                    </p>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  {isFetching ? "Changing Password..." : "Change Password"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
