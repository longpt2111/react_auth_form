import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data.accessToken);
        return {
          ...prev,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
        };
      });
      return response.data.accessToken;
    } catch (err) {
      console.error("Error refreshing token:", err);
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
