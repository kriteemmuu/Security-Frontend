import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaMoneyCheck, FaUsers, FaBox, FaShoppingCart } from "react-icons/fa";

const DashBoard = () => {
  const [statData, setStatData] = useState(null);

  useEffect(() => {
    const fetchedData = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      try {
        const res = await axios.get(
          `http://localhost:3001/api/order/get-stats`,
          config
        );
        setStatData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchedData();
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <FaMoneyCheck /> Total Revenue
              </Card.Title>
              <Card.Text>
                {statData ? `Rs ${statData.totalIncome}` : "Loading..."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <FaUsers /> Total Customers
              </Card.Title>
              <Card.Text>
                {statData ? statData.totalUsers : "Loading..."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <FaShoppingCart /> Total Orders
              </Card.Title>
              <Card.Text>
                {statData ? statData.totalOrders : "Loading..."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>
                <FaBox /> Total Products
              </Card.Title>
              <Card.Text>
                {statData ? statData.totalProducts : "Loading..."}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
