import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './components/Graph';
import Controls from './components/GraphControls';

const App = () => {
  const [dataStream, setDataStream] = useState([{ x: 0, y: 0 }]);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(async () => {
        try {
          const response = await axios.get('http://localhost:8000/sin');

          setDataStream((prevDataStream) => {
            const lastData = prevDataStream[prevDataStream.length - 1];
            const newPoint = {
              x: lastData.x + 1,
              y: response.data["data"],
            };

            // Remove the oldest data if the length exceeds 100
            if (prevDataStream.length >= 100) {
              prevDataStream.shift(); // Remove the first element
            }
            
            // Return data
            return [...prevDataStream, newPoint];
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <div>
      <Graph dataStream={dataStream} />
      <Controls isPaused={isPaused} togglePause={togglePause} />
      {/* Adicione mais componentes conforme necessário */}
    </div>
  );
};

export default App;
