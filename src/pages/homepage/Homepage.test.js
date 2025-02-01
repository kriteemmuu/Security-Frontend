
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Api from '../../apis/Api';

jest.mock('react-toastify', () => {
  return {
    toast: {
      error: jest.fn(),
      success: jest.fn(),
      info: jest.fn(),
    },
  };
});

jest.mock('../../apis/Api', () => ({
  getAllProducts: jest.fn(),
}));

const mockProducts = [
  {
    _id: '1',
    productName: 'Maternity Dress',
    productPrice: '3999',
    productImage: 'dress.jpg',
  },
  {
    _id: '2',
    productName: 'Maternity Jeans',
    productPrice: '2999',
    productImage: 'jeans.jpg',
  },
];

describe('Home Component', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Api.getAllProducts.mockResolvedValue({
      data: {
        data: mockProducts,
      },
    });
    window.localStorage.setItem('wishlist', JSON.stringify([{ _id: '1' }]));
  });

  test('renders loading spinner initially', () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('loads and displays products', async () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByText('Maternity Dress')).toBeInTheDocument();
      expect(screen.getByText('Maternity Jeans')).toBeInTheDocument();
    });
  });

  test('handles wishlist addition correctly', async () => {
    render(<BrowserRouter><Home /></BrowserRouter>);
    await waitFor(() => screen.getByText('View Product'));

    const addToWishlistButtons = screen.getAllByRole('button', { name: /heart/i });
    fireEvent.click(addToWishlistButtons[1]); // Click on 'Add to Wishlist' for second item

    expect(toast.success).toHaveBeenCalledWith('Added to Wishlist!');
    expect(JSON.parse(localStorage.getItem('wishlist'))).toHaveLength(2);
  });

  test('shows error toast when API fails', async () => {
    Api.getAllProducts.mockRejectedValueOnce(new Error('API Error'));
    render(<BrowserRouter><Home /></BrowserRouter>);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error fetching products.');
    });
  });

  test('handles empty product data', async () => {
    Api.getAllProducts.mockResolvedValueOnce({
      data: { data: [] },
    });
    render(<BrowserRouter><Home /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText('No Data Found')).toBeInTheDocument();
    });
  });
});
