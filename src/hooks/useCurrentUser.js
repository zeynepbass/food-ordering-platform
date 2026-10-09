import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import userService from "@/services/userService";

const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const [loaded, setLoaded] = useState(null);

  useEffect(() => {
    if (!email) return undefined;

    let active = true;
    userService
      .getByEmail(email)
      .then((user) => active && setLoaded({ email, user }))
      .catch(() => active && setLoaded(null));

    return () => {
      active = false;
    };
  }, [email]);

  // A user loaded for a previous session must not leak into the next one.
  const user = email && loaded?.email === email ? loaded.user : null;

  return { user, session, status };
};

export default useCurrentUser;
