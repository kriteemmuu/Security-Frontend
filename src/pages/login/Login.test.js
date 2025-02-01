
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login'; // Update the path to where your Login component is located.
import { loginUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';

// Mocks
jest.mock('../../apis/Api', () => ({
  loginUserApi: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Helper function to render the component within a router
const renderLogin = () => {
  render(
    <Router>
      <Login />
    </Router>
  );
};

describe('Login Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears any previous calls to mocks
  });

  it('should render the login form with all fields and buttons', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('should display error messages for invalid inputs', async () => {
    renderLogin();
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    await waitFor(() => {
      expect(screen.getByText('Email is empty or invalid')).toBeInTheDocument();
      expect(screen.getByText('Password is empty')).toBeInTheDocument();
    });
  });

  it('should update state on input change', () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText('Enter your email address');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    const passwordInput = screen.getByPlaceholderText('Enter your password');
    fireEvent.change(passwordInput, { target: { value: 'strongpassword' } });
    expect(passwordInput.value).toBe('strongpassword');
  });

  it('should handle successful login', async () => {
    loginUserApi.mockResolvedValue({
      data: {
        success: true,
        message: 'Login successful!',
        token: 'fakeToken123',
        userData: {
          role: 'admin'
        }
      }
    });

    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'strongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login successful!');
    });
  });

  it('should handle login failure', async () => {
    loginUserApi.mockRejectedValue({
      response: {
        data: {
          success: false,
          message: 'Login failed'
        }
      }
    });

    renderLogin();
    fireEvent.change(screen.getByPlaceholderText('Enter your email address'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'strongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Login failed. Please try again.');
    });
  });
});
