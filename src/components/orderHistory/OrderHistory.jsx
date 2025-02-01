import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderHistory = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const res = await axios.get(
          `https://localhost:3001/api/order/get-user-orders`,
          config
        );
        setAllOrders(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchedData();
  }, []);

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

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">Loading...</div>{" "}
        </div>
      ) : (
        <table
          className="min-w-full bg-white border border-gray-200"
          style={{ marginTop: "4rem", marginBottom: "4rem" }}
        >
          <thead>
            <tr>
              <th className="px-4 py-2 border">SN</th>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Items Price</th>
              <th className="px-4 py-2 border">Shipping Price</th>
              <th className="px-4 py-2 border">Tax Price</th>
              <th className="px-4 py-2 border">Total Price</th>
              <th className="px-4 py-2 border">Payment Info</th>
              <th className="px-4 py-2 border">Order Status</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {allOrders && allOrders.length > 0 ? (
              allOrders.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{order._id}</td>
                  <td className="px-4 py-2 border">Rs.{order.itemsPrice}</td>
                  <td className="px-4 py-2 border">Rs.{order.shippingPrice}</td>
                  <td className="px-4 py-2 border">Rs.{order.taxPrice}</td>
                  <td className="px-4 py-2 border">Rs.{order.totalPrice}</td>
                  <td className="px-4 py-2 border">{order.paymentInfo}</td>
                  <td className={getStatusColor(order.orderStatus)}>
                    {order.orderStatus.charAt(0).toUpperCase() +
                      order.orderStatus.slice(1)}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Link to={`/single-order/${order._id}`}>
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
