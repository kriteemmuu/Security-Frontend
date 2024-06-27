import { useLocation } from "react-router-dom";

const ProductDetails = () => {
  const location = useLocation();
  const { name, price, image } = location.state;

  return (
    <div>
      <h2>Product Details</h2>
      <div>
        <img src={image} alt={name} style={{ height: '200px', objectFit: 'cover' }} />
        <h3>{name}</h3>
        <p>Price: ${price}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
