import React, { useState, useEffect } from "react";
import styles from "./Seeker.module.css";
import FillIn from "../../images/FillIn.png";
import axios from "axios";

export const Seeker = () => {
  const [city, setCity] = useState("Select City");
  const [weather, setWeather] = useState([]);
  const [seekingDate, setSeekingDate] = useState("Select Date");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let time = new Date(seekingDate).getTime() / 1000;
    let timeUTC = new Date(seekingDate).toUTCString().slice(5, 16);
    let obj = {
      Samara: { lat: 53.2, long: 50.15 },
      Tolyatti: { lat: 53.53, long: 49.34 },
      Saratov: { lat: 51.54, long: 46.0 },
      Kazan: { lat: 55.78, long: 49.12 },
      Krasnodar: { lat: 45.04, long: 38.97 },
    };
    for (var key in obj) {
      if (city === key && seekingDate !== "Select Date") {
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${obj[key].lat}&lon=${obj[key].long}&units=metric&dt=${time}&appid=1ff5a880beaa22f497a0f476494404fb`
          )
          .then((res) => {
            setWeather(res.data);
            setReady(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [city, seekingDate]);

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Forecast for a Date in the Past</h3>
      <div className={styles.selectorWrapper}>
        <select
          name="select"
          className={styles.selector}
          id="exampleFormControlSelect1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option className={styles.citiesList}>Select City</option>
          <option className={styles.citiesList}>Samara</option>
          <option className={styles.citiesList}>Tolyatti</option>
          <option className={styles.citiesList}>Saratov</option>
          <option className={styles.citiesList}>Kazan</option>
          <option className={styles.citiesList}>Krasnodar</option>
        </select>

        <input
          className={styles.calendar}
          id="selectDate"
          onFocus={() => (document.getElementById("selectDate").type = "date")}
          onBlur={() => (document.getElementById("selectDate").type = "text")}
          placeholder="Select Date"
          type="text"
          value={seekingDate}
          onChange={(e) => setSeekingDate(e.target.value)}
        />
      </div>

      {(city === "Select City" || seekingDate === "Select Date") && (
        <div className={styles.cardsContainer}>
          <div className={styles.fill}>
            <img src={FillIn} className={styles.fillIn} />
            <div className={styles.date}>
              Fill in all the fields and the weather will be displayed
            </div>
          </div>
        </div>
      )}
      {city !== "Select City" && ready && (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <div className={styles.imageAndDate}>
              <p className={styles.dateText}>
                {new Date(seekingDate).toUTCString().slice(5, 16).toLowerCase()}
              </p>
            </div>
            <div className={styles.date}>
              <img
                src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png `}
              />
            </div>
            <div className={styles.temp}>
              {weather.hourly[12].temp.toFixed(0) > 0
                ? "+" + weather.hourly[12].temp.toFixed(0) + "°"
                : "-" + weather.hourly[12].temp.toFixed(0) + "°"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
