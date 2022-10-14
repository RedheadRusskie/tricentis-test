import { FC } from "react";

// styles
import styles from "./Main.module.css";

// components
import { SearchBar } from "../../components/SearchBar/SearchBar";

export const Main: FC = () => {
  return (
    <div className={styles.main}>
      <SearchBar />
    </div>
  );
};
