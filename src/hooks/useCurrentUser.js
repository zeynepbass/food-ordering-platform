import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import userService from "@/services/userService";

const useCurrentUser = () => {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!email) {
      setUser(null);
      return undefined;
    }

    let active = true;
    userService
      .getByEmail(email)
      .then((currentUser) => active && setUser(currentUser))
      .catch(() => active && setUser(null));

    return () => {
      active = false;
    };
  }, [email]);

  return { user, session, status };
};

export default useCurrentUser;
