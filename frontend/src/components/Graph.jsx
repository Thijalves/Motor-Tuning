import React from 'react';
import Chart from 'react-apexcharts';

const Graph = ({ realSpeedStream, targetSpeedStream}) => {

  // Arredonda os valores para uma casa decimal
  const roundedRealSpeedStream = realSpeedStream.map(point => ({
    x: point.x,
    y: parseFloat(point.y.toFixed(1)),
  }));

  // Arredonda os valores para uma casa decimal
  const roundedTargetSpeedStream = targetSpeedStream.map(point => ({
    x: point.x,
    y: parseFloat(point.y.toFixed(1)),
  }));

  const series = [
    {
      name: 'Real speed',
      data: roundedRealSpeedStream,
    },
    {
      name: 'Target Speed',
      data: roundedTargetSpeedStream,
    },
  ];

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
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };

  return <Chart options={options} series={series} type="line" height={400} width={600} />;
};

export default Graph;