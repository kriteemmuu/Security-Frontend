import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideBar from "../sideBar/SideBar";
import PropTypes from "prop-types";

const MainLayout = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="auto">
            <SideBar />
          </Col>
          <Col className="p-3 bg-light">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
