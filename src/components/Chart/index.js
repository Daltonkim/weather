import React, { useEffect, useState } from "react";
import { VerticalBarChart } from "./VerticalBarChart";

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

const WeatherChart = ({ weatherForSevenDayForecastServiceOne, weatherForSevenDayForecastServiceTwo }) => {

  const [series, setSeries] = useState([
    {
      name: "Service one",
      data: []
    },
    {
      name: "Service two",
      data: []
    }
  ]
  )

  useEffect(() => {
    // if (weatherForSevenDayForecastServiceOne !== null) {
      let chartone = weatherForSevenDayForecastServiceOne
      let newArr = [...series]; 
      newArr[0].data = chartone;
      setSeries(newArr);

      let chartTwo = weatherForSevenDayForecastServiceTwo
      newArr[1].data = chartTwo;
      setSeries(newArr);
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherForSevenDayForecastServiceOne, weatherForSevenDayForecastServiceTwo])

  return (
    <div className="row">
      <VerticalBarChart arrayDates={aryDates} series={series}/>
    </div>
  );
}

export default WeatherChart;