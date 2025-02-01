
import { Container, Row, Col, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="border-0 shadow">
            <Card.Body>
              <Card.Title as="h2" className="fs-1">Privacy Policy</Card.Title> {/* Adjusted the size to h2 and class to fs-1 for smaller headings */}
              <p className="lead">
                Welcome to Diva Maternity Store. We are committed to protecting the privacy and security of our customers&apos; information.
              </p>

              <Card.Text as="div">
                <h3 className="fs-5">1. Introduction</h3> {/* Smaller subheading using fs-2 class */}
                <p>This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.</p>

                <h3 className="fs-5">2. Information We Collect</h3> {/* Smaller subheading using fs-2 class */}
                <ul>
                  <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
                  <li><strong>Demographic Information:</strong> Age, gender, postcode, preferences, interests, and favorites.</li>
                  <li><strong>Billing Information:</strong> Credit card details and billing address.</li>
                  <li><strong>Browser and Device Information:</strong> IP address, browser type, device type, operating system, and other technical identifiers.</li>
                  <li><strong>Usage Data:</strong> Preferences, pages visited, links clicked, and other actions taken within the service.</li>
                </ul>

                <h3 className="fs-5">3. How We Use Your Information</h3> {/* Smaller subheading using fs-2 class */}
                <p>The information we collect may be used in the following ways:</p>
                <ul>
                  <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
                  <li>To improve our website in order to better serve you.</li>
                  <li>To allow us to better service you in responding to your customer service requests.</li>
                  <li>To administer contests, promotions, surveys or other site features.</li>
                  <li>To quickly process your transactions.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
// import { Container, Row, Col, Card } from 'react-bootstrap';

// const PrivacyPolicy = () => {
//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col md={10}>
//           <Card className="shadow" style={{ backgroundColor: '#FDFBD4', color: '#333' }}> {/* Amber background with dark text for readability */}
//             <Card.Body>
//               <Card.Title as="h2" style={{ color: '#333' }}>Privacy Policy Template</Card.Title> {/* Dark text color */}
//               <p className="lead" style={{ color: '#333' }}>
//                 Welcome to Diva Maternity Store. We are committed to protecting the privacy and security of our customers&apos; information.
//               </p>

//               <Card.Text as="div" style={{ color: '#333' }}>
//                 <h3>1. Introduction</h3>
//                 <p>This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website.</p>

//                 <h3>2. Information We Collect</h3>
//                 <ul>
//                   <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
//                   <li><strong>Demographic Information:</strong> Age, gender, postcode, preferences, interests, and favorites.</li>
//                   <li><strong>Billing Information:</strong> Credit card details and billing address.</li>
//                   <li><strong>Browser and Device Information:</strong> IP address, browser type, device type, operating system, and other technical identifiers.</li>
//                   <li><strong>Usage Data:</strong> Preferences, pages visited, links clicked, and other actions taken within the service.</li>
//                 </ul>

//                 <h3>3. How We Use Your Information</h3>
//                 <p>The information we collect may be used in the following ways:</p>
//                 <ul>
//                   <li>To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
//                   <li>To improve our website in order to better serve you.</li>
//                   <li>To allow us to better service you in responding to your customer service requests.</li>
//                   <li>To administer contests, promotions, surveys or other site features.</li>
//                   <li>To quickly process your transactions.</li>
//                 </ul>
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PrivacyPolicy;

