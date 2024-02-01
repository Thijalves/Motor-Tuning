import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TargetGenerator from './components/TargetGenerator';

const Dev = () => {
  const [targets, setTargets] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [displayingTargets, setDisplayingTargets] = useState(false);

  // Update targets from target generator
  const updateTargets = (event) => {
    const newTargets = event.target.value.split(',').map(target => parseFloat(target.trim()));
    setTargets(newTargets);
  };

  const startDisplayingTargets = () => {
    let targetIndex = 0;

    const displayTargets = () => {
      if (targetIndex < targets.length) {
        setCurrentTarget(targets[targetIndex]);

        // Send HTTP POST request with the current target as the payload
        sendHttpPostRequest(targets[targetIndex]);

        targetIndex++;
        setTimeout(displayTargets, 1000); // Display each target for 1 second
      } else {
        setCurrentTarget(null);
        setDisplayingTargets(false);
      }
    };

    setDisplayingTargets(true);
    displayTargets();
  };

  const sendHttpPostRequest = (currentTarget) => {

    axios.post('http://localhost:8000/setTargetSpeed', { speed: currentTarget })
      .then(response => {
        console.log('HTTP POST request successful:', response.data);
        // Handle the response as needed
      })
      .catch(error => {
        console.error('HTTP POST request failed:', error);
        // Handle errors
      });
  };

  return (
    <div>
      <TargetGenerator updateTargets={updateTargets} />
      <button onClick={startDisplayingTargets} disabled={displayingTargets}>
        Start Displaying Targets
      </button>
      <div>
        <label>Current Target:</label>
        <p>{currentTarget}</p>
      </div>
    </div>
  );
};

export default Dev;
