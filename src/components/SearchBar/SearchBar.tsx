import { FC } from "react";

// styles
import styles from "./SearchBar.module.css";

export const SearchBar: FC = () => {
  return (
    <form className={styles.searchbar}>
      <input type="text" placeholder="Search"/>
    </form>
  )
}