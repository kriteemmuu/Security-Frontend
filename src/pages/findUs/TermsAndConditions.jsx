import { Container, Card } from 'react-bootstrap';

const TermsAndConditions = () => {
  return (
    <Container className="mt-5">
      <Card className="border-0 shadow">
        <Card.Body>
          <Card.Title as="h1">Terms and Conditions</Card.Title>
          <Card.Text as="div">
            <h5>Introduction</h5>
            <p>Welcome to Diva Maternity Store. By accessing this site, you accept these terms and conditions in full. Do not continue to use the website if you do not accept all of the terms and conditions stated on this page.</p>

            <h5>Use License</h5>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Diva Maternity Store&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>Attempt to decompile or reverse engineer any software contained on Diva Maternity Store&apos;s website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>
            <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Diva Maternity Store at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</p>

            <h5>Disclaimer</h5>
            <p>The materials on Diva Maternity Store&apos;s website are provided on an &apos;as is&apos; basis. Diva Maternity Store makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            
            <h5>Limitations</h5>
            <p>In no event shall Diva Maternity Store or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Diva Maternity Store&apos;s website, even if Diva Maternity Store or a Diva Maternity Store authorized representative has been notified orally or in writing of the possibility of such damage.</p>

            <h5>Governing Law</h5>
            <p>Any claim relating to Diva Maternity Store&apos;s website shall be governed by the laws of the State without regard to its conflict of law provisions.</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TermsAndConditions;
