import { useMemo, useState } from "react";

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

  return [value, actions];
};

export default useToggle;
