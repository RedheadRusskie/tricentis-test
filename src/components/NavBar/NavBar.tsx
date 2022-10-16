import { FC } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export const NavBar: FC = () => {
  return <nav className={styles.navbar}>
    <div className={styles.container}>
      <label>Ivan K</label>
      <ul>
        <li><Link to="/">Task I</Link> </li>
        <li><Link to="/task-2">Task II</Link> </li>
      </ul>
      <hr />
    </div>
  </nav>
}
