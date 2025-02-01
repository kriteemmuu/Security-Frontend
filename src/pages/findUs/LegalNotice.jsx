
import { Container, Card } from 'react-bootstrap';

const LegalNotice = () => {
  const yellowHeadingStyle = {
    color: '#FCA510' // Yellow color for subheadings
  };

  return (
    <Container className="mt-5">
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <Card.Title as="h1" className="text-center">Legal Notice</Card.Title>
          <Card.Text>
            <p>Welcome to the Diva Maternity Store website (&quot;Site&quot;). This Legal Notice applies to the entire contents of the Site and to any correspondence by email between us and you. Please read these terms carefully before using the Site. Using the Site indicates that you accept these terms regardless of whether or not you choose to register with us. If you do not accept these terms, do not use the Site.</p>
            
            <h2 style={yellowHeadingStyle}>Copyright Notice</h2>
            <p>All content included on the Site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Diva Maternity Store or its content suppliers and protected by international copyright laws. The compilation of all content on this Site is the exclusive property of Diva Maternity Store, with copyright owned by Diva Maternity Store or its licensors.</p>
            
            <h2 style={yellowHeadingStyle}>Trademark Information</h2>
            <p>Diva Maternity Store and other marks indicated on our site are trademarks or registered trademarks of Diva Maternity Store, in the European Union and/or other jurisdictions. Diva Maternity Store&apos;s graphics, logos, page headers, button icons, scripts, and service names are the trademarks or trade dress of Diva Maternity Store. Diva Maternity Store&apos;s trademarks and trade dress may not be used in connection with any product or service that is not Diva Maternity Store&apos;s, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits Diva Maternity Store.</p>
            
            <h2 style={yellowHeadingStyle}>Disclaimer</h2>
            <p>The materials on Diva Maternity Store&apos;s website are provided &quot;as is&quot;. Diva Maternity Store makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h2 style={yellowHeadingStyle}>Limitation of Liability</h2>
            <p>In no event shall Diva Maternity Store or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Diva Maternity Store&apos;s website, even if Diva Maternity Store or a Diva Maternity Store authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h2 style={yellowHeadingStyle}>Contact Information</h2>
            <p>For more information about our legal practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at support@divamaternity.com or by mail using the details provided below:</p>
            <p>Diva Maternity Store, [Re: Legal Compliance Department], [Street Address], [City, State, ZIP], [Country]</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LegalNotice;
