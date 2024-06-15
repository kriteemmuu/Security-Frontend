import React, { useState } from 'react';
import { registerUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';

const Register = () => {
  // Use state for all fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  // Use state for error messages
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [genderError, setGenderError] = useState('');

  // Handle input changes
  const handleFirstname = (e) => setFirstName(e.target.value);
  const handleLastname = (e) => setLastName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleDateOfBirth = (e) => setDateOfBirth(e.target.value);
  const handleGender = (e) => setGender(e.target.value);

  // Validation function
  const validate = () => {
    let isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('First name is required!');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (lastName.trim() === '') {
      setLastNameError('Last name is required!');
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is required!');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required!');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm password is required!');
      isValid = false;
    } else if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and confirm password don't match!");
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (dateOfBirth.trim() === '') {
      setDateOfBirthError('Date of birth is required!');
      isValid = false;
    } else {
      setDateOfBirthError('');
    }

    if (gender.trim() === '') {
      setGenderError('Gender is required!');
      isValid = false;
    } else {
      setGenderError('');
    }

    return isValid;
  };

  // Submit button function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Sending request to the API
    const data = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      gender,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className='container mt-5'>
        <h1 className='text-center'>Create Your Maternity Store Account</h1>

        <form className='w-50 mx-auto mt-4'>
          <div className='mb-3'>
            <label className='form-label'>First Name</label>
            <input
              onChange={handleFirstname}
              type='text'
              className='form-control'
              placeholder='Enter your first name'
            />
            {firstNameError && <p className='text-danger'>{firstNameError}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Last Name</label>
            <input
              onChange={handleLastname}
              type='text'
              className='form-control'
              placeholder='Enter your last name'
            />
            {lastNameError && <p className='text-danger'>{lastNameError}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              onChange={handleEmail}
              type='email'
              className='form-control'
              placeholder='Enter your email'
            />
            {emailError && <p className='text-danger'>{emailError}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              onChange={handlePassword}
              type='password'
              className='form-control'
              placeholder='Enter your password'
            />
            {passwordError && <p className='text-danger'>{passwordError}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Confirm Password</label>
            <input
              onChange={handleConfirmPassword}
              type='password'
              className='form-control'
              placeholder='Confirm your password'
            />
            {confirmPasswordError && (
              <p className='text-danger'>{confirmPasswordError}</p>
            )}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Date of Birth</label>
            <input
              onChange={handleDateOfBirth}
              type='date'
              className='form-control'
              placeholder='Enter your date of birth'
            />
            {dateOfBirthError && <p className='text-danger'>{dateOfBirthError}</p>}
          </div>

          <div className='mb-3'>
            <label className='form-label'>Gender</label>
            <select
              onChange={handleGender}
              className='form-control'
            >
              <option value=''>Select your gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
            {genderError && <p className='text-danger'>{genderError}</p>}
          </div>

          <button onClick={handleSubmit} className='btn btn-primary w-100'>
            Create Your Account
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
