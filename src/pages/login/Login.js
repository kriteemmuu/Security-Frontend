// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loginUserApi } from "../../apis/Api.js";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const validation = () => {
//     let isValid = true;

//     if (email.trim() === "" || !email.includes("@")) {
//       setEmailError("Email is empty or invalid");
//       isValid = false;
//     }

//     if (password.trim() === "") {
//       setPasswordError("Password is empty");
//       isValid = false;
//     }
//     return isValid;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!validation()) {
//       return;
//     }

//     const data = {
//       email: email,
//       password: password,
//     };

//     setLoading(true);

//     try {
//       const res = await loginUserApi(data);

//       setLoading(false);

//       if (res.data.success === false) {
//         toast.error(res.data.message);
//       } else {
//         toast.success(res.data.message);
//         localStorage.setItem("token", res.data.token);
//         const convertedData = JSON.stringify(res.data.userData);
//         localStorage.setItem("user", convertedData);

//         // Navigate after setting the local storage
//         if (res.data.userData.role === "admin") {
//           navigate("/admin_dashboard");
//         } else {
//           navigate("/");
//         }
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Login error:", error);
//       toast.error("Login failed. Please try again.");
//     }
//   };

//   return (
//     <div
//       className="container mt-12"
//       style={{
//         marginBottom: "3rem",
//         marginTop: "8rem",
//       }}
//     >
//       <div className="d-flex justify-content-center mt-5">
//         <img
//           src="/assets/images/pregnancy.png"
//           alt="Pregnancy"
//           style={{ height: "100px" }}
//         />
//       </div>
//       <h1 className="text-center mt-4">Login to Diva</h1>
//       <form onSubmit={handleLogin} className="w-50 mx-auto mt-4">
//         <div className="mb-3">
//           <label className="form-label">Email Address</label>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             type="text"
//             className="form-control"
//             placeholder="Enter your email address"
//           />
//           {emailError && <p className="text-danger">{emailError}</p>}
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             type="password"
//             className="form-control"
//             placeholder="Enter your password"
//           />
//           {passwordError && <p className="text-danger">{passwordError}</p>}
//         </div>

//         <div className="text-center">
//           <button className="btn btn-primary w-51 mt-2" disabled={loading}>
//             {loading ? "Loading..." : "Login"}
//           </button>
//         </div>

//         <div className="text-center mt-3">
//           <Link to="/forgotpassword" className="text-warning">
//             Forgot Password?
//           </Link>
//         </div>

//         <div className="text-center mt-3">
//           <p>
//             Dont have an account? <Link to="/register">Register Now</Link>
//           </p>

//           <button
//             className="btn btn-success w-51 mt-2"
//             style={{
//               backgroundColor: "#dfc9ee",
//               color: "black",
//               marginRight: "10px",
//             }}
//           >
//             <img
//               src="/assets/images/google.png"
//               alt="Google Logo"
//               style={{ height: "20px", marginRight: "10px" }}
//             />
//             Sign Up with Google
//           </button>
//           <button
//             className="btn btn-success w-51 mt-2"
//             style={{ backgroundColor: "#dfc9ee", color: "black" }}
//           >
//             <img
//               src="/assets/images/apple.png"
//               alt="Apple Logo"
//               style={{ height: "20px", marginRight: "10px" }}
//             />
//             Sign Up with Apple ID
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { loginUserApi } from "../../apis/Api.js";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [loginErr, setLoginErr] = useState({});

//   const validateForm = () => {
//     let newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!email.trim() || !emailRegex.test(email)) {
//       newErrors.email = "Please enter a valid email address!";
//     }

//     if (!password.trim() || !passwordRegex.test(password)) {
//       newErrors.password =
//         "Password must be at least 8 characters long, including one uppercase, one lowercase, one number, and one special character.";
//     }

//     setLoginErr(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please correct the errors before submitting.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await loginUserApi({ email, password });
//       setLoading(false);

//       if (res.data.success) {
//         toast.success("Login successful!");
//         localStorage.setItem("token", res.data.token);
//         const convertedData = JSON.stringify(res.data.data);
//         localStorage.setItem("user", convertedData);

//         if (res.data.data.role === "admin") {
//           navigate("/admin_dashboard");
//         } else {
//           navigate("/");
//         }
//       } else {
//         toast.error(res.data.message || "Login failed. Please try again.");
//       }
//     } catch (error) {
//       setLoading(false);

//       if (error.response) {
//         toast.error(
//           error.response.data.message ||
//             `Error: ${error.response.status} - ${error.response.statusText}`
//         );
//       } else if (error.request) {
//         toast.error("No response from server. Please check your connection.");
//       } else {
//         toast.error("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <h2 className="text-center">Login to Diva</h2>
//           <Form onSubmit={handleSubmit} className="mt-4">
//             <Form.Group className="mb-3">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               {loginErr.email && (
//                 <p className="text-danger">{loginErr.email}</p>
//               )}
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               {loginErr.password && (
//                 <p className="text-danger">{loginErr.password}</p>
//               )}
//             </Form.Group>

//             <Row className="align-items-center mb-3">
//               <Col xs={6}>
//                 <Form.Check
//                   type="checkbox"
//                   label="Remember Me"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//               </Col>
//               <Col xs={6} className="text-end">
//                 <Link to="/forgotpassword" className="text-warning">
//                   Forgot Password?
//                 </Link>
//               </Col>
//             </Row>

//             <Button
//               type="submit"
//               variant="primary"
//               className="w-100"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </Form>

//           <div className="text-center mt-3">
//             <p>
//               Don’t have an account? <Link to="/register">Register Now</Link>
//             </p>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginErr, setLoginErr] = useState({});
  const [captcha, setCaptcha] = useState(""); // Generated CAPTCHA
  const [userCaptchaInput, setUserCaptchaInput] = useState(""); // User input for CAPTCHA
  const [isCaptchaCorrect, setIsCaptchaCorrect] = useState(false); // Controls login button visibility

  // Function to generate a random numeric CAPTCHA (4-digit)
  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4-digit number
    setCaptcha(randomCaptcha);
    setUserCaptchaInput(""); // Reset user input
    setIsCaptchaCorrect(false); // Disable login button until correct input
  };

  // Generate CAPTCHA when the component loads
  useEffect(() => {
    generateCaptcha();
  }, []);

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address!";
    }

    if (!password.trim() || !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, including one uppercase, one lowercase, one number, and one special character.";
    }

    setLoginErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUserApi({ email, password });
      setLoading(false);

      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("token", res.data.token);
        const convertedData = JSON.stringify(res.data.data);
        localStorage.setItem("user", convertedData);

        if (res.data.data.role === "admin") {
          navigate("/admin_dashboard");
        } else {
          navigate("/");
        }
      } else {
        toast.error(res.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
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
    }
  };

  // Function to validate the CAPTCHA input
  const handleCaptchaInputChange = (e) => {
    const inputValue = e.target.value;
    setUserCaptchaInput(inputValue);

    // Check if the entered CAPTCHA matches the generated one
    if (inputValue === captcha) {
      setIsCaptchaCorrect(true); // Enable login button
    } else {
      setIsCaptchaCorrect(false); // Keep login button disabled
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Login to Diva</h2>
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {loginErr.email && (
                <p className="text-danger">{loginErr.email}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {loginErr.password && (
                <p className="text-danger">{loginErr.password}</p>
              )}
            </Form.Group>

            <Row className="align-items-center mb-3">
              <Col xs={6}>
                <Form.Check
                  type="checkbox"
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              </Col>
              <Col xs={6} className="text-end">
                <Link to="/forgotpassword" className="text-warning">
                  Forgot Password?
                </Link>
              </Col>
            </Row>

            {/* CAPTCHA Field */}
            <Form.Group className="mb-3">
              <Form.Label>Enter the CAPTCHA code below:</Form.Label>
              <div
                className="p-2 text-center mb-2"
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  display: "inline-block",
                  width: "100px",
                }}
              >
                {captcha}
              </div>
              <Form.Control
                type="text"
                placeholder="Enter CAPTCHA"
                value={userCaptchaInput}
                onChange={handleCaptchaInputChange}
              />
              {!isCaptchaCorrect && userCaptchaInput !== "" && (
                <p className="text-danger">Incorrect CAPTCHA, try again.</p>
              )}
            </Form.Group>

            {/* Login Button - Hidden until CAPTCHA is correctly entered */}
            <Button
              type="submit"
              variant="primary"
              className="w-100 mt-3"
              disabled={!isCaptchaCorrect || loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Don’t have an account? <Link to="/register">Register Now</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;


// const sanitize = require("mongo-sanitize");
// const xss = require("xss-clean");
// const User = require("../models/User");

// // Define Joi Schema for Input Validation
// const loginSchema = Joi.object({
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required(),
// });

// const loginCredentials = async (req, res) => {
//   try {
//     // ✅ Validate Input using Joi
//     const { error } = loginSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ success: false, message: error.details[0].message });
//     }

//     // ✅ Sanitize Input to Prevent MongoDB Injection
//     let email = sanitize(req.body.email);
//     let password = sanitize(req.body.password);

//     // ✅ Prevent XSS Attacks
//     email = xss(email);
//     password = xss(password);

//     // ✅ Secure MongoDB Query
//     const user = await User.findOne({ email: { $eq: email } }).select("+password");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User doesn't exist!" });
//     }

//     // ✅ Check Account Lock Status
//     if (user.lockUntil && user.lockUntil > Date.now()) {
//       return res.status(403).json({
//         success: false,
//         message: "Account locked due to multiple failed login attempts. Try again after 24 hours.",
//       });
//     }

//     // ✅ Ensure Email is Verified
//     if (!user.verified) {
//       try {
//         await sendOTP(user);
//         return res.status(201).json({ success: true, message: "OTP sent to email, verify account" });
//       } catch (error) {
//         return res.status(500).json({ success: false, message: "Internal Server Error!" });
//       }
//     }

//     // ✅ Validate Password
//     const isPasswordMatched = await user.comparePassword(password);

//     if (!isPasswordMatched) {
//       user.failedLoginAttempts += 1;

//       // Lock Account if Too Many Failed Attempts
//       if (user.failedLoginAttempts >= 5) {
//         user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 Hours Lock
//         await user.save();
//         return res.status(403).json({
//           success: false,
//           message: "Too many failed attempts. Account locked for 24 hours.",
//         });
//       }

//       await user.save();
//       return res.status(400).json({ success: false, message: "Invalid credentials!" });
//     }

//     // ✅ Reset Failed Login Attempts
//     user.failedLoginAttempts = 0;
//     user.lockUntil = null;
//     await user.save();

//     // ✅ Generate JWT Token
//     const token = user.getJwtToken();

//     res.status(200).json({
//       success: true,
//       message: "Login successful!",
//       data: user,
//       token,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error!" });
//   }
// };

// module.exports = { loginCredentials };