import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { singleOrder } from "../../apis/Api";
import { FaArrowLeft } from "react-icons/fa";

const SingleOrderHistory = () => {
  const { id } = useParams();
  const [myOrder, setMyOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const res = await singleOrder(id);
        setMyOrder(res.data.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchedData();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-danger";
      case "Shipped":
        return "text-primary";
      case "Delivered":
        return "text-success";
      default:
        return "text-secondary";
    }
  };

  if (isLoading) <div>Loading...</div>;

  const {
    createdAt,
    itemsPrice,
    orderItems,
    orderStatus,
    paymentInfo,
    shippingInfo,
    shippingPrice,
    taxPrice,
    totalPrice,
    user,
  } = myOrder || {};

  return (
    <div className="container mx-auto p-4">
      <div className="d-flex align-items-center">
        <Link to="/user-order-history" className="text-decoration-none me-3">
          <FaArrowLeft />
        </Link>
        <h2 className="mb-0">Order Details</h2>
      </div>

      <div className="mb-4" style={{ marginTop: "2rem" }}>
        <h3 className="text-lg font-semibold">User Information</h3>
        <p>
          Name: {user?.firstName} {user?.lastName}
        </p>
        <p>Email: {user?.email}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Shipping Information</h3>
        <p>
          Address: {shippingInfo?.address}, {shippingInfo?.city},{" "}
          {shippingInfo?.province}, {shippingInfo?.country},{" "}
          {shippingInfo?.postalCode}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Information</h3>
        <p>Order ID: {myOrder?._id}</p>
        <p>
          Order Status:
          <span
            className={getStatusColor(orderStatus)}
            style={{ marginLeft: "5px" }}
          >
            {orderStatus?.charAt(0).toUpperCase() + orderStatus?.slice(1)}
          </span>
        </p>

        <p>Payment Method: {paymentInfo}</p>
        <p>Order Date: {new Date(createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Items</h3>
        <ul>
          {orderItems?.map((item, index) => (
            <li key={index} className="mb-2">
              <img
                width="90px"
                height="auto"
                src={`http://localhost:3001/products/${item?.productImg}`}
                alt="productImage"
              />

              <p>Product: {item?.productName}</p>
              <p>Quantity: {item?.quantity}</p>
              <p>Price: Rs.{item?.price}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Pricing Information</h3>
        <p>Items Price: Rs.{itemsPrice}</p>
        <p>Shipping Price: Rs.{shippingPrice}</p>
        <p>Tax Price: Rs.{taxPrice}</p>
        <p>Total Price: Rs.{totalPrice}</p>
      </div>
    </div>
  );
};

export default SingleOrderHistory;
