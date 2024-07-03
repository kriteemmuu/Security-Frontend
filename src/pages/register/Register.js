import { useState } from "react";
import { registerUserApi } from "../../apis/Api.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleFirstname = (e) => setFirstName(e.target.value);
  const handleLastname = (e) => setLastName(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const validate = () => {
    let isValid = true;

    if (!firstName.trim()) {
      setFirstNameError("First name is required!");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName.trim()) {
      setLastNameError("Last name is required!");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!phone.trim()) {
      setPhoneError("Phone number is required!");
      isValid = false;
    } else {
      setPhoneError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required!");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required!");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Passwords do not match!");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    const data = {
      firstName,
      lastName,
      phone,
      email,
      password,
    };

    registerUserApi(data)
      .then((res) => {
        setLoading(false);
        if (!res.data.success) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/login");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Registration error:", error);
        toast.error("Registration failed. Please try again.");
      });
  };

  return (
    
    <>
      <div className="container mt-5">
        <h1 className="text-center">Create Your  Account</h1>
        <form onSubmit={handleSubmit} className="w-50 mx-auto mt-4">
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" placeholder="Enter your first name" onChange={handleFirstname} />
            {firstNameError && <p className="text-danger">{firstNameError}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" placeholder="Enter your last name" onChange={handleLastname} />
            {lastNameError && <p className="text-danger">{lastNameError}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" placeholder="Enter your phone number" onChange={handlePhone} />
            {phoneError && <p className="text-danger">{phoneError}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" onChange={handleEmail} />
            {emailError && <p className="text-danger">{emailError}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter your password" onChange={handlePassword} />
            {passwordError && <p className="text-danger">{passwordError}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm your password" onChange={handleConfirmPassword} />
            {confirmPasswordError && <p className="text-danger">{confirmPasswordError}</p>}
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            {loading && <span>Loading...</span>}
            
            Create an Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
