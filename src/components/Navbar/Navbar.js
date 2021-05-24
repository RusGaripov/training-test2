import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.head}></div>
      <div className={styles.weathForecast}>
        <div className={styles.weathForecast__weather}>Weather</div>
        <div className={styles.weathForecast__forecast}>forecast</div>
      </div>
      <div className={styles.container}>
        <NavLink
          exact
          to="/"
          className={styles.navbarLink}
          activeClassName={styles.selected}
        >
          Прогноз погоды на 7 дней
        </NavLink>
        <NavLink
          to="/enquiry"
          className={styles.navbarLink}
          activeClassName={styles.selected}
        >
          Прогноз погоды на определенную дату
        </NavLink>
      </div>
    </nav>
  );
};
