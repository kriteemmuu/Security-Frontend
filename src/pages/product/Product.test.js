
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AddProduct from './AddProduct';
import { createProductApi } from '../../apis/Api';
import { toast } from 'react-toastify';

jest.mock('../../apis/Api', () => ({
  createProductApi: jest.fn(),
}));
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn()
  }
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('AddProduct Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <Router>
        <AddProduct />
      </Router>
    );
  });

  it('renders form elements correctly', () => {
    expect(screen.getByPlaceholderText('Enter your product name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your product price')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Product' })).toBeInTheDocument();
  });

  it('validates form fields before submitting', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Add Product' }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please fill all fields and select an image');
    });
  });

  it('submits the form and navigates on successful addition', async () => {
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    fireEvent.change(screen.getByPlaceholderText('Enter your product name'), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your product price'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Choose Product Image'), { target: { files: [file] } });

    createProductApi.mockResolvedValue({ status: 201, data: { message: 'Product added successfully' } });

    fireEvent.click(screen.getByRole('button', { name: 'Add Product' }));
    await waitFor(() => {
      expect(createProductApi).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Product added successfully');
      expect(mockNavigate).toHaveBeenCalledWith('/admin_dashboard/all-productsList');
    });
  });
});
