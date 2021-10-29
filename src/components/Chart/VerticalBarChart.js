/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useEffect } from "react";
import ApexCharts from "apexcharts";

export function VerticalBarChart({ series, arrayDates }) {
 

  useEffect(() => {
    const element = document.getElementById("chart");

    if (!element) {
      return;
    }

    const options = getChartOption(series,arrayDates);
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [arrayDates, series]);

  return (
    <div className={`card card-custom}`}>
      <div className="card-body p-0">
        <div className="d-flex align-items-center justify-content-between card-spacer flex-grow-1">

          <div className="d-flex flex-column text-right">

          </div>
        </div>
        <div
          id="chart"
          className="card-rounded-bottom"
          style={{ height: "150px" }}
        ></div>
      </div>
    </div>
  );
}

function getChartOption(series, arrayDates) {
  var options = {
    series,
    colors: ["#5048E5"],
    chart: {
      height: 350,
      type: 'bar',
      // color: "#5048E5",
       toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        // color: "#5048E5",
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#5048E5"]
      }
    },

    xaxis: {
      categories: arrayDates,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#5048E5',
            colorTo: '#5048E5',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: false,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }

    },
    title: {
      // text: 'Monthly Inflation in Argentina, 2002',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  return options;
}
