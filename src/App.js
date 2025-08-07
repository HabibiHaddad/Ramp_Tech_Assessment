import React, { useState, useEffect } from "react";

/*
Script used to extract the hidden URL:
1. Fetched HTML from challenge endpoint
2. Found that the DOM structure used <b class="ramp ref" value="char"> elements instead of <i class="char" value="char">
3. Extracted characters from these elements in order to form the URL:
   https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/7a6561
4. Tested the URL and confirmed it returns the flag: "zealous"
*/

const App = () => {
  const [flag, setFlag] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayedChars, setDisplayedChars] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch flag from discovered URL
  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/7a6561"
        );
        const flagText = await response.text();
        setFlag(flagText.trim());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setFlag("Error loading flag");
        setLoading(false);
      }
    };

    fetchFlag();
  }, []);

  // Typewriter effect - display characters one by one with 500ms delay
  useEffect(() => {
    if (!loading && flag && currentIndex < flag.length) {
      const timeout = setTimeout(() => {
        setDisplayedChars((prev) => [...prev, flag[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [loading, flag, currentIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Ramp Challenge - Flag Display</h1>
      <ul>
        {displayedChars.map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
