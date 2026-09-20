import { useCallback, useMemo, useState } from "react";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const actions = useMemo(
    () => ({
      open: () => setValue(true),
      close: () => setValue(false),
      toggle: () => setValue((current) => !current),
    }),
    []
  );

  const set = useCallback((next) => setValue(next), []);

  return [value, { ...actions, set }];
};

export default useToggle;
