import React from 'react';
import Chart from 'react-apexcharts';

const Graph = ({ dataStream }) => {
  const series = [{
    name: 'Velocity',
    data: dataStream,
  }];

  const options = {
    chart: {
      id: 'realtime',
      height: 200,
      type: 'line',
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
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
      min: -100,
    },
    legend: {
      show: false,
    },
  };

  return <Chart options={options} series={series} type="line" height={350} />;
};

export default Graph;
