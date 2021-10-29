import React, { Component } from "react";
import Chart from "react-apexcharts";

function GetDates(startDate, daysToAdd) {
  var aryDates = [];

  for (var i = 0; i <= daysToAdd; i++) {
    var currentDate = new Date();
    currentDate.setDate(startDate.getDate() + i);
    aryDates.push(DayAsString(currentDate.getDay()) + ", " + currentDate.getDate() + " " + MonthAsString(currentDate.getMonth()) + " " + currentDate.getFullYear());
  }

  return aryDates;
}

function MonthAsString(monthIndex) {
  // eslint-disable-next-line no-array-constructor
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";

  return month[monthIndex];
}

function DayAsString(dayIndex) {
  var weekdays = new Array(7);
  weekdays[0] = "Sun";
  weekdays[1] = "Mon";
  weekdays[2] = "Tue";
  weekdays[3] = "Wed";
  weekdays[4] = "Thur";
  weekdays[5] = "Fri";
  weekdays[6] = "Sat";

  return weekdays[dayIndex];
}

var startDate = new Date();
var aryDates = GetDates(startDate, 3);

class WeatherChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: aryDates
        }
      },
      series: [
        {
          name: "Service one",
          data: [30, 40, 45, 50, 49, 60, 70, 91].slice(0, 4)
        },
        {
          name: "Service two",
          data: [30, 40, 45, 50, 49, 60, 70, 91].slice(0, 4)
        }
      ]
    };
  }

  componentDidMount() {

    console.log(this.props.weatherForSevenDayForecastServiceOne)
    console.log(this.props.weatherForSevenDayForecastServiceTwo)

  }

  render() {
    return (
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
          />
        </div>
      </div>
    );
  }
}

export default WeatherChart;