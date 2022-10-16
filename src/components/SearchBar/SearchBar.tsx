import { FC, useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { uniqBy } from "lodash-es";
import styles from "./SearchBar.module.css";
import { useDebouncedState } from "../../hooks/useDebouncedState";

type Track = {
  id: number;
  collectionName: string;
};

type ApiResponse = {
  resultCount: number;
  results: { trackId: number; collectionName: string }[];
};

export const SearchBar: FC = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebouncedState<
    string | null
  >(null, 500);

  const { data: tracksFromApi, isLoading } = useQuery<Track[] | null>(
    ["music", debouncedSearchTerm],
    async () => {
      if (!debouncedSearchTerm) {
        return null;
      }

      const {
        data: { results },
      } = await axios.get<ApiResponse>(
        `https://itunes.apple.com/search?term=${debouncedSearchTerm}`
      );

      const tracks = results.map((track) => ({
        id: track.trackId,
        collectionName: track.collectionName
      }));

      const uniqTracks = uniqBy(tracks, (track) => track.collectionName).slice(
        0,
        5
      );

      return uniqTracks.length === 0 ? null : uniqTracks;
    }
  );

  const [tracks, setTracks] = useState(tracksFromApi);

  useEffect(() => {
    setTracks(tracksFromApi);
  }, [tracksFromApi]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTracks((prev) => prev && prev.slice(1).concat(prev[0]));
    }, 1000);

    return () => clearInterval(timer);
  }, [
    /** reset timer each time results for a new search term are loaded */
    tracksFromApi,
  ]);

  const handleChange = useCallback(
    (value: string) => {
      if (value === "") {
        return setDebouncedSearchTerm(null);
      }

      setDebouncedSearchTerm(value);
    },
    [setDebouncedSearchTerm]
  );

  return (
    <div className={styles.container}>
      <form className={styles.searchbar}>
        <input
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          placeholder="Search term"
          defaultValue={""}
        />
      </form>

      <ul className={debouncedSearchTerm && tracks && !isLoading &&  styles.results}>
        {isLoading ? (
          <li className={styles.message}><i>Loading...</i></li>
        ) : !debouncedSearchTerm ? (
          <li className={styles.message}><i>Enter a search term</i></li>
        ) : !tracks ? (
          <li className={styles.message}><i>Enter a search term</i></li>
        ) : (
          tracks.map((result) => (
            <li className={styles.result} key={result.id}>
              {result.collectionName}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
