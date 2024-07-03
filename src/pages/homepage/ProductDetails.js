import { useLocation, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructuring data with fallbacks in case of undefined state
  const { name, price, image, description  } = location.state || {};

  // Handling the case where there might not be any product data
  if (!location.state) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h2>No Product Found</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Product Details</h2>
      <div style={{ textAlign: 'center' }}>
        <img src={image} alt={name} style={{ height: '200px', objectFit: 'cover' }} />
        <h3>{name}</h3>
        <p>Price: Rs {price}</p>
        <p>{description}</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

export default ProductDetails;
