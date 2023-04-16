import React, { useEffect, useState } from "react";
import "./Info.css";
import img1 from "../../img/gawr-think.png";
import img2 from "../../img/gawr-think_done.png";

function Info() {
  const [tasks, setTasks] = useState([]);
  const [countAll, setCountAll] = useState(0);
  const [countUnfinish, setCountUnfinish] = useState(0);
  const [countDone, setCountDone] = useState(0);
  const [count, setCount] = useState(0);
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateList = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
  ];

  const day = dayList[new Date().getDay()];
  const date = dateList[new Date().getDate() - 1];
  const month = monthList[new Date().getMonth()];
  const year = new Date().getFullYear();
  useEffect(() => {
    setTimeout(() => {
      const storageTasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(storageTasks);
      setCountAll(tasks.length);
      setCountUnfinish(
        tasks.filter((task) => task.isCompleted !== true).length
      );
      setCountDone(tasks.filter((task) => task.isCompleted !== false).length);
      setCount(count + 1);
    }, 200);
    return () => clearTimeout();
  }, [count]);

  return (
    <div className="info">
      <div className="date">
        <div className="date-top">
          {day}, {date},
        </div>
        <div className="date-bottom">
          {month}, {year}
        </div>
      </div>

      <div className="name-app">TO-DO-LIST</div>

      <div className="info-bottom">
        <div className="item">
          <div className="item-count">{countAll}</div>
          <div className="item-name">All</div>
        </div>
        <div className="item">
          <div className="item-count">{countUnfinish}</div>
          <div className="item-name">Unfinish</div>
        </div>
        <div className="item">
          <div className="item-count">{countDone}</div>
          <div className="item-name">Done</div>
        </div>
      </div>

      <div className="img1" style={{ backgroundImage: `url(${img1})` }}></div>
      <div className="img2" style={{ backgroundImage: `url(${img2})` }}></div>
    </div>
  );
}

export default Info;
