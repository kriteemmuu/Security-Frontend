import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { adminSingleOrder } from "../../../../apis/Api";
import { Row, Col, Container, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const AdminSingleOrder = () => {
  const statuses = ["Shipped", "Delivered"];
  const { id } = useParams();
  const [singleOrder, setSingleOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(
    statuses[Math.floor(Math.random() * statuses.length)]
  );

  const handleUpdateStatus = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    try {
      setIsLoading(true);
      await axios.put(
        `https://localhost:3001/api/order/update-orderStatus/${id}`,
        { status: selectedStatus },
        config
      );
      toast.success("Status Updated Successfully!");
      navigate("/admin_dashboard/all-orderList");
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await adminSingleOrder(id);
        setSingleOrder(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedData();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "text-danger";
      case "shipped":
        return "text-primary";
      case "delivered":
        return "text-success";
      default:
        return "text-secondary";
    }
  };

  if (!singleOrder) return <div>Loading...</div>;

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
  } = singleOrder || {};

  return (
    <Container className="p-4">
      <div className="d-flex align-items-center mb-4">
        <Link
          to="/admin_dashboard/all-orderList"
          className="text-decoration-none me-3"
        >
          <FaArrowLeft />
        </Link>
        <h2 className="mb-0">Order Details</h2>
      </div>

      <Row>
        <Col md={6}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">User Information</h3>
            <p>
              Name: {user?.firstName} {user?.lastName}
            </p>
            <p>Email: {user?.email}</p>
          </div>

          <div className="mb-0">
            <h3 className="text-lg font-semibold">Order Items</h3>
            <ul>
              {orderItems?.map((item) => (
                <li key={item._id} className="mb-2">
                  <img
                    width="90px"
                    height="auto"
                    src={`https://localhost:3001/products/${item?.productImg}`}
                    alt="productImage"
                  />
                  <p>Product: {item?.productName}</p>
                  <p>Quantity: {item?.quantity}</p>
                  <p>Price: Rs.{item?.price}</p>
                </li>
              ))}
            </ul>
          </div>
        </Col>

        <Col md={6}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Order Information</h3>
            <p>Order ID: {singleOrder?._id}</p>
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
            <p>Order Date: {new Date(createdAt)?.toLocaleDateString()}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Pricing Information</h3>
            <p>Items Price: Rs.{itemsPrice}</p>
            <p>Shipping Price: Rs.{shippingPrice}</p>
            <p>Tax Price: Rs.{taxPrice}</p>
            <p>Total Price: Rs.{totalPrice}</p>
          </div>
        </Col>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Shipping Information</h3>
          <p>
            Address: {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.province}, {shippingInfo?.country},{" "}
            {shippingInfo.postalCode}
          </p>
        </div>
      </Row>
      <div>
        <div className="mb-3">
          <label htmlFor="orderStatus" className="form-label">
            Update Order Status
          </label>
          <select
            id="orderStatus"
            className="form-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statuses?.map((status) => (
              <>
                <option key={status} value={status}>
                  {status}
                </option>
              </>
            ))}
          </select>
        </div>

        <Button
          variant="primary"
          onClick={handleUpdateStatus}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            `Update to ${selectedStatus}`
          )}
        </Button>
      </div>
    </Container>
  );
};

export default AdminSingleOrder;
