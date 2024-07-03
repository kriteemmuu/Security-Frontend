import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProductApi, deleteProduct, getAllProducts } from '../../apis/Api.js';

function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        toast.error("Failed to fetch products: " + error.message);
      });
  }, []);

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productCategory', productCategory);
    formData.append('productDescription', productDescription);
    formData.append('productImage', productImage);

    createProductApi(formData)
      .then(response => {
        console.log(response)
        toast.success("Product saved successfully");
        getAllProducts().then(response => {
          setProducts(response.data.products);
        });
      })
      .catch(error => {
        toast.error("Error saving product: " + error.message);
      });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId)
        .then(response => {
          console.log(response)
          toast.success("Product deleted successfully");
          setProducts(products.filter(product => product._id !== productId));
        })
        .catch(error => {
          toast.error("Error deleting product: " + error.message);
        });
    }
  };

  return (
    <div className='container mt-3'>
      <div className='d-flex justify-content-between'>
        <h3>Happy Shopping...</h3>

        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
        
      </div>
      <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProductModalLabel">Add/Edit Product</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">Product Name</label>
                  <input type="text" className="form-control" id="productName" value={productName} onChange={e => setProductName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="productPrice" className="form-label">Product Price</label>
                  <input type="number" className="form-control" id="productPrice" value={productPrice} onChange={e => setProductPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="productCategory" className="form-label">Category</label>
                  <select className="form-select" id="productCategory" value={productCategory} onChange={e => setProductCategory(e.target.value)}>
                    <option value="baby">Baby</option>
                    <option value="mom">Mom</option>
                    <option value="toys">Toys</option>
                    <option value="food">Food</option>
                    <option value="essentials">Essentials</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="productDescription" className="form-label">Description</label>
                  <textarea className="form-control" id="productDescription" value={productDescription} onChange={e => setProductDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="productImage" className="form-label">Image</label>
                  <input type="file" className="form-control" id="productImage" onChange={handleImageChange} />
                  {previewImage && <img src={previewImage} alt="Preview" className="img-thumbnail mt-2" style={{ maxWidth: '200px' }} />}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Product</button>
            </div>
          </div>
        </div>
      </div>

      <table className="table mt-3">
        <thead className="table-light">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td><img src={`http://localhost:3001/products/${product.productImage}`} alt={product.productName} style={{ width: '50px', height: '50px' }} /></td>
              <td>{product.productName}</td>
              <td>${product.productPrice}</td>
              <td>{product.productCategory}</td>
              <td>{product.productDescription}</td>
              <td>
                <Link to={`/admin/update/${product._id}`} className='btn btn-primary'>Edit</Link>
                <button onClick={() => handleDeleteProduct(product._id)} className='btn btn-danger ms-2'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
