import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUserApi } from '../../apis/Api';
import Navbar from '../../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validation = () => {
    let isValid = true;

    if (email.trim() === '' || !email.includes('@')) {
      setEmailError('Email is empty or invalid');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is empty');
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        const convertedData = JSON.stringify(res.data.userData);
        localStorage.setItem('user', convertedData);
      }
    });
  };

  return (
    <div className='container'>
      <Navbar />
      <div className='d-flex justify-content-center mt-5'>
        <img src="assets/images/pregnancy.png" alt='Logo' style={{ height: '100px' }} />
      </div>
      <h1 className='text-center mt-4'>Login to Diva</h1>
      <form className='w-50 mx-auto mt-4'>
        <div className='mb-3'>
          <label className='form-label'>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Enter your email address'
          />
          {emailError && <p className='text-danger'>{emailError}</p>}
        </div>

        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className='form-control'
            placeholder='Enter your password'
          />
          {passwordError && <p className='text-danger'>{passwordError}</p>}
        </div>

        <button onClick={handleLogin} className='btn btn-primary w-100 mt-3'>
          Login
        </button>

        <div className='text-center mt-3'>
          <Link to='/forgotpassword' className='text-warning'>Forgot Password?</Link>
        </div>
        
        <div className='text-center mt-3'>
        <p>Don&apos;t have an account? <Link to='/register'>Register Now</Link></p>

          {/* Add buttons for logging in with Google and Apple ID */}
          <button className="btn w-100 mt-2" style={{ backgroundColor: '#db4437', color: '#fff' }}>
            <img src="assets/images/google.png" alt="Google Logo" style={{ height: '20px', marginRight: '10px' }} />
            Sign Up with Google
          </button>
          <button className="btn w-100 mt-2" style={{ backgroundColor: '#000', color: '#fff' }}>
            <img src="assets/images/apple.png" alt="Apple Logo" style={{ height: '20px', marginRight: '10px' }} />
            Sign Up with Apple ID
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
