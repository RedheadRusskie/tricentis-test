import { FC, FormEvent, FormEventHandler, useEffect, useState } from "react";

// styles
import styles from "./SearchBar.module.css";

export const SearchBar: FC = () => {
  const [userInput, setUserInput] = useState("");
  const [resultsPool, setResultsPool] = useState([
    { id: 1, name: "test one" },
    { id: 2, name: "test two" },
    { id: 3, name: "test three" },
    { id: 4, name: "test four" },
    { id: 5, name: "test five" },
    { id: 6, name: "test six" },
  ]);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    console.log(userInput);
  };

  const handleChange = (value: string): void => {
    // if (value !== "") setUserInput(value);
    setUserInput(value);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setResultsPool(resultsPool.slice(1).concat(resultsPool[0]));
    }, 1000);
    return () => clearInterval(timer);
  }, [resultsPool]);

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.searchbar}>
        <input
          onChange={(e) => handleChange((e.target as HTMLInputElement).value)}
          type="text"
          placeholder="Search"
          value={userInput}
        />
      </form>
      <ul className={styles.results}>
        {userInput.length > 0 &&
          resultsPool
            .filter((result) =>
              result.name.toLowerCase().includes(userInput.toLocaleLowerCase())
            )
            .map((result) => (
              <li className={styles.result} key={result.id}>
                {result.name}
              </li>
            ))}
      </ul>
    </div>
  );
};
