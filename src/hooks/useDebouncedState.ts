import { debounce } from "lodash-es";
import { useState } from "react";

export const useDebouncedState = <T>(
  initialState: T | (() => T),
  waitMs?: number
) => {
  const [state, setState] = useState(initialState);

  const debouncedSetState = debounce(setState, waitMs);

  return [state, debouncedSetState] as const;
};