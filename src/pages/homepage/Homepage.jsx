import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { testApi } from '../../apis/Api';

const Homepage = () => {
  // State to store API response
  const [apiResponse, setApiResponse] = useState(null);

  // Print Hello! and trigger testAPI when the page loads
  useEffect(() => {
    console.log('Hello!!!');

    // Trigger testAPI
    testApi()
      .then((res) => {
        console.log(res); // Test API is working!
        setApiResponse(res.data);
      })
      .catch((error) => {
        console.error('Error fetching test API:', error);
      });
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Welcome to the Homepage!</h1>
        <p>Diva!!!!!!!!</p>
        {apiResponse && (
          <div>
            <h2>API Response:</h2>
            <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
