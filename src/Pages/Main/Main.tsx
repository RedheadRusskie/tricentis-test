import { FC } from "react";
import styles from "./Main.module.css";
import { SearchBar } from "../../components/SearchBar/SearchBar";

export const Main: FC = () => {
  return (
    <div className={styles.main}>
      <SearchBar />
    </div>
  );
};
