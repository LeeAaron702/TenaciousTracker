import { useState, useEffect } from "react";

const useUser = (token) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const getUser = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const { account: user } = await result.json();
      setUser(user);
    };
    getUser();
  }, [token]);

  return user;
};

export default useUser;
