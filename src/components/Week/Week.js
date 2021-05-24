import React, { useState, useEffect } from "react";
import styles from "./Week.module.css";
import axios from "axios";
import FillIn from "../../images/FillIn.png";
import iconLeft from "../../images/iconLeft.png";
import iconRight from "../../images/iconRight.png";
import { Seeker } from "../Seeker/Seeker";

export const Week = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7];
  const initialCount = 0;

  const [count, setCount] = useState(initialCount);
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("Select city");
  const [ready, setReady] = useState(false);
  const [x, setX] = useState(0);

  const logMousePosition = (e) => {
    setX(e.clientX);

    let width = 174;
    let list = document.querySelector(`.carousel`);
    if (window.innerWidth < 768 && list !== null) {
      if (e.clientX > x && count < 7) {
        setCount(count + 1);
        list.style.marginLeft = -width * count + "px";
      }
      if (e.clientX <= x && count > -1) {
        setCount(count - 1);
        list.style.marginLeft = -width * count + "px";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", logMousePosition);
    return () => {
      window.removeEventListener("mousemove", logMousePosition);
    };
  }, [x]);

  useEffect(() => {
    setCount(initialCount);
    let width = 333; // ширина картинки
    let list = document.querySelector(`.carousel`);
    if (city !== "Select city" && ready)
      list.style.marginLeft = -width * count + "px";
  }, [window.innerWidth > 600, x > 600]);

  useEffect(() => {
    let obj = {
      Samara: { lat: 53.195873, long: 50.100193 },
      Tolyatti: { lat: 53.507836, long: 49.420393 },
      Saratov: { lat: 51.533557, long: 46.034257 },
      Kazan: { lat: 55.796127, long: 49.106405 },
      Krasnodar: { lat: 45.03547, long: 38.975313 },
    };
    for (var key in obj) {
      if (city === key) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${obj[key].lat}&lon=${obj[key].long}&units=metric&exclude=hourly&appid=1ff5a880beaa22f497a0f476494404fb`
          )
          .then((res) => {
            setWeather(res.data);
            setReady(true);
          })
          .catch((err) => {});
      }
    }
    setCount(initialCount);
  }, [city]);

  useEffect(() => {
    let width = 184; // ширина картинки
    let list = document.querySelector(`.carousel`);
    if (window.innerWidth > 600) {
      if (city !== "Select city" && ready)
        list.style.marginLeft = -width * count + "px";
    }
  }, [count]);

  function convertTimestamp(timestamp) {
    var d = new Date(timestamp * 1000);
    let str = d.toString();
    let month = str.slice(4, 7).toLowerCase();
    let day = str.slice(8, 10);
    let year = str.slice(11, 15);
    let formattedTime = day.concat(" ", month, " ", year);
    return formattedTime;
  }

  const days = numbers.map((number, index) => (
    <div key={index} className={styles.card}>
      {city !== "Select city" && ready && (
        <ul
          className="images"
          style={{ paddingLeft: "0px", paddingTop: "20px", height: "238px" }}
        >
          <li className={styles.listItem}>
            <p className={styles.dateText}>
              {convertTimestamp(weather.daily[index].dt)}
            </p>
            <div className={styles.date}>
              <img
                className={styles.icon}
                src={`http://openweathermap.org/img/wn/${weather.daily[index].weather[0].icon}@2x.png `}
              />
            </div>
            <div className={styles.temp}>
              {" "}
              {weather.daily[index].temp.day > 0
                ? "+" + weather.daily[index].temp.day.toFixed(0) + "°"
                : "-" + weather.daily[index].temp.day.toFixed(0) + "°"}
            </div>
          </li>
        </ul>
      )}
    </div>
  ));

  const prevClick = () => {
    if (count > 0) setCount(count - 1);
  };
  const nextClick = () => {
    if (count < 4) setCount(count + 1);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <h3 className={styles.header}>7 Days Forecast </h3>
        {city !== "Select city" && ready && (
          <img src={iconLeft} className={styles.iconLeft} onClick={prevClick} />
        )}
        {city !== "Select city" && ready && (
          <img
            src={iconRight}
            className={styles.iconRight}
            onClick={nextClick}
          />
        )}
        <div className={styles.selectorWrapper}>
          <select
            name="select"
            className={styles.selector}
            id="exampleFormControlSelect1"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option className={styles.citiesList}>Select city</option>
            <option className={styles.citiesList}>Samara</option>
            <option className={styles.citiesList}>Tolyatti</option>
            <option className={styles.citiesList}>Saratov</option>
            <option className={styles.citiesList}>Kazan</option>
            <option className={styles.citiesList}>Krasnodar</option>
          </select>
        </div>
        {city !== "Select city" && ready && (
          <div className={styles.cardsContainer}>
            <div className="carousel" style={{ width: "552px" }}>
              {days}
            </div>
          </div>
        )}
        {city === "Select city" && (
          <div className={styles.selectCity}>
            <img src={FillIn} className={styles.fillIn} />
            <div className={styles.date}>
              Fill in all the fields and the weather will be displayed
            </div>
          </div>
        )}
      </div>
      <div className={styles.seeker}>
        <Seeker />
      </div>
    </div>
  );
};
