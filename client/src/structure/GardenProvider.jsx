import apiClient from "../utils/apiClient";
import { createContext, useContext, useState, useEffect } from "react";
const GardenContext = createContext();

export const useGardenContext = () => useContext(GardenContext);
export default function GardenProvider({ children }) {
  const [user, setUser] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    const fetchUserAndMaybeWeather = async () => {
      try {
        const res = await apiClient.get("/loggedIn");
        const loggedUser = res.data.user;

        if (!loggedUser) {
          setUser(null);
          return;
        }

        setUser(loggedUser);
      } catch (err) {
        console.log("Errore login:", err);
      }
    };

    fetchUserAndMaybeWeather();
  }, []);

  return (
    <GardenContext.Provider value={{ user, setUser, snackbar, setSnackbar }}>
      {children}
    </GardenContext.Provider>
  );
}
