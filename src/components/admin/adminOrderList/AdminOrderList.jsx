import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminOrderList = () => {
  const [adminOrders, setAdminOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setIsLoading(true);

      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await axios.get(
          `http://localhost:3001/api/order/all-orders`,
          config
        );
        setAdminOrders(res.data.data);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchedData();
  }, []);

  const handleDeleteOrder = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      await axios.delete(
        `http://localhost:3001/api/order/delete-order/${id}`,
        config
      );
      toast.success("order deleted successFully!");
      setAdminOrders(adminOrders.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

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

  if (isLoading) {
    <h1>Loading.....</h1>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.button}>Add Order</button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">SN</th>
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
          {adminOrders && adminOrders.length > 0 ? (
            adminOrders?.map((order, index) => (
              <tr key={order._id}>
                <td className="px-4 py-2 border">{index + 1}</td>
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
                <td style={{ ...styles.td, ...styles.actionCell }}>
                  <Link
                    to={`/admin_dashboard/admin-single-order/${order._id}`}
                    style={{ color: "blue" }}
                  >
                    <FaPencilAlt />
                  </Link>
                  <Link
                    to={"#"}
                    style={{ color: "red" }}
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    <FaTrash />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <span style={{ textAlign: "center" }}>No data Found</span>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
  },
  header: {
    textAlign: "right",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
    margin: "5px",
  },
  editButton: {
    backgroundColor: "#007BFF",
  },
  deleteButton: {
    backgroundColor: "#DC3545",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  th: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  },
  img: {
    borderRadius: "4px",
  },
  actionCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};

export default AdminOrderList;
