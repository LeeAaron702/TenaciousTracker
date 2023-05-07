import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@galvanize-inc/jwtdown-for-react";

function Logout() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`, {
        method: "DELETE",
        credentials: "include",
      });
      setToken(null);
      document.cookie =
        "fastapi_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/Login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Are you sure you would like to log out?
    </button>
  );
}

export default Logout;
