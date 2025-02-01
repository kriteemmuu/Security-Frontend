// import { Container, Row, Col } from "react-bootstrap";

// const Footer = () => {
//   return (
//     <footer className="bg-light py-4 mt-auto">
//       <Container>
//         <Row>
//           <Col md={6}>
//             <h5>Diva Maternity Store</h5>
//             <p>Specializing in clothes and accessories for pregnant women.</p>
//           </Col>
//           <Col md={6} className="text-md-end">
//             <ul className="list-unstyled">
              
//               <li>
//                 <a href="#about">About Us</a>
//               </li>
              
//               <li>
//                 <a href="#privacy">Privacy Policy</a>
//               </li>
//             </ul>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="text-center mt-3">
//             <p>
//               &copy; {new Date().getFullYear()} Diva Maternity Store. All rights
//               reserved.
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;



// import { Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-light py-4 mt-auto">
//       <Container>
//         <Row>
//           <Col md={6}>
//             <h5>Diva Maternity Store</h5>
//             <p>Specializing in clothes and accessories for pregnant women.</p>
//           </Col>
//           <Col md={6} className="text-md-end">
//             <ul className="list-unstyled">
//               <li>
//                 <Link to="/about-us">About Us</Link>  {/* Link to About Us */}
//               </li>
//               <li>
//                 <Link to="/privacy-policy">Privacy Policy</Link>  {/* Link to Privacy Policy */}
//               </li>
//             </ul>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="text-center mt-3">
//             <p>
//               &copy; {new Date().getFullYear()} Diva Maternity Store. All rights reserved.
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;



import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Diva Maternity Store</h5>
            <p>Specializing in clothes and accessories for pregnant women.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <ul className="list-unstyled">
              <li><Link to="/about-us">About Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/legal-notice">Legal Notice</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            <div>
              <FontAwesomeIcon icon={faFacebookF} size="lg" className="mx-2" />
              <FontAwesomeIcon icon={faInstagram} size="lg" className="mx-2" />
              <FontAwesomeIcon icon={faPinterest} size="lg" className="mx-2" />
              <FontAwesomeIcon icon={faGoogle} size="lg" className="mx-2" />
            </div>
            <p>
              &copy; {new Date().getFullYear()} Diva Maternity Store. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
