import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './components/Graph';
import Controls from './components/GraphControls';

const App = () => {
  const [realSpeedStream, setRealSpeedStream] = useState([{ x: 0, y: 0 }]);
  const [targetSpeedStream, setTargetSpeedStream] = useState([{ x: 0, y: 0 }]);
  const [isPaused, setIsPaused] = useState(false);

  // useEffect for realSpeedStream
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.get('http://localhost:8000/sin');

          setRealSpeedStream((prevRealSpeedStream) => {
            const lastData = prevRealSpeedStream[prevRealSpeedStream.length - 1];
            const newPoint = {
              x: lastData.x + 1,
              y: response.data["data"],
            };

            if (prevRealSpeedStream.length >= 100) {
              prevRealSpeedStream.shift();
            }

            return [...prevRealSpeedStream, newPoint];
          });
        } catch (error) {
          console.error('Error fetching realSpeedStream data:', error);
        }
      }, 200);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  // useEffect for targetSpeedStream
  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.get('http://localhost:8000/cos');

          setTargetSpeedStream((prevTargetSpeedStream) => {
            const lastData = prevTargetSpeedStream[prevTargetSpeedStream.length - 1];
            const newPoint = {
              x: lastData.x + 1,
              y: response.data["data"],
            };

            if (prevTargetSpeedStream.length >= 100) {
              prevTargetSpeedStream.shift();
            }

            return [...prevTargetSpeedStream, newPoint];
          });
        } catch (error) {
          console.error('Error fetching targetSpeedStream data:', error);
        }
      }, 200);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <div>
      <Graph realSpeedStream={realSpeedStream} targetSpeedStream={targetSpeedStream} />
      <Controls isPaused={isPaused} togglePause={togglePause} />
      {/* Add more components as needed */}
    </div>
  );
};

export default App;
