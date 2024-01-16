import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const App = () => {
  const [dataStream, setDataStream] = useState([{ x: 0, y: 0 }]);
  const [isPaused, setIsPaused] = useState(false);

  const series = [{
    name: 'Velocity',
    data: dataStream,
  }];

  const options = {
    chart: {
      id: 'realtime',
      height: 100,
      type: 'line',
      animations: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Speed',
      align: 'left',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'numeric',
      range: 100,
    },
    yaxis: {
      max: 100,
      min: 0,
    },
    legend: {
      show: false,
    },
  };

  useEffect(() => {
    let intervalId;

    if (!isPaused) {
      intervalId = setInterval(async () => {
        try {
          // http request
          const response = await axios.get('http://localhost:8000/sin');

          // Update the state with the fetched data
          setDataStream((prevDataStream) => {
            const newData = response.data;
            const lastData = prevDataStream[prevDataStream.length - 1];
            const newPoint = {
              x: lastData.x + 1,
              y: newData["speed"],
            };

            // Remove the oldest data if the length exceeds 100
            if (prevDataStream.length >= 100) {
              prevDataStream.shift(); // Remove the first element
            }

            return [...prevDataStream, newPoint];
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, 100);
    }

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
      <button onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
    </div>
  );
};

export default App;
