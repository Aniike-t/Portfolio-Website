import { useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {
  useEffect(() => {
    // This function will run once when the component mounts
    const trackVisit = async () => {
      if (!API_URL) {
        console.log("Analytics tracking is disabled (VITE_API_URL is not set).");
        return;
      }
      try {
        // We call the /cookies endpoint from your Flask app
        await fetch(`${API_URL}/cookies`);
        console.log("Visit tracked successfully.");
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };

    trackVisit();
  }, []); // The empty dependency array ensures this runs only once

  // This component renders nothing
  return null;
};

export default Analytics;