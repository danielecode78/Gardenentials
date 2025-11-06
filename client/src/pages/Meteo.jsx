import { weatherRequest } from "../components/meteo/fetches/weatherRequest";
import { weatherUpdate } from "../components/meteo/fetches/weatherUpdate";

import MeteoSummary from "../components/meteo/MeteoSummary";
import MeteoCurrentDetails from "../components/meteo/MeteoCurrentDetails";
import MeteoDays from "../components/meteo/MeteoDays";

import { useGardenContext } from "@/structure/GardenProvider";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";

import { useState } from "react";
import { useEffect } from "react";

export default function Meteo() {
  const { setSnackbar } = useGardenContext();
  const [weatherResponse, setWeatherResponse] = useState([]);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    weatherRequest(setWeatherResponse, setSnackbar);
  }, []);

  useEffect(() => {
    if (weatherResponse.length === 0 || hasUpdated) return;

    const sorted = [...weatherResponse].sort(
      (a, b) =>
        new Date(a.weather?.dataApi?.current?.last_updated || 0) -
        new Date(b.weather?.dataApi?.current?.last_updated || 0)
    );
    const lastUpdated = new Date(
      sorted[0]?.weather?.dataApi?.current?.last_updated || 0
    );
    const now = new Date();
    const difference = now - lastUpdated;
    const pastTime = 60 * 60 * 1000;

    if (difference > pastTime) {
      weatherUpdate(setWeatherResponse, setSnackbar);
      setSnackbar({
        open: true,
        message: "Dati meteo caricati con successo!",
        severity: "success",
      });
      setHasUpdated(true);
    }
  }, [weatherResponse]);

  return (
    <Grid container spacing={2}>
      {weatherResponse &&
        weatherResponse.map((garden, index) => {
          const current = garden?.weather?.dataApi?.current;

          const dayState = current?.is_day === 1 ? "Giorno" : "Notte";

          return (
            <Grid key={garden._id} size={{ xs: 12, xl: 6 }}>
              <Accordion
                sx={{
                  width: "100%",
                }}
              >
                <AccordionSummary
                  aria-controls="panel3-content"
                  id="panel3-header"
                  sx={{
                    "& .css-yfrx4k-MuiAccordionSummary-content.Mui-expanded": {
                      my: "12px",
                    },
                  }}
                >
                  <MeteoSummary
                    current={current}
                    location={garden.location.address}
                    name={garden.name}
                    alerts={garden.weather?.dataApi?.alerts?.alert?.length}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <MeteoCurrentDetails
                    current={current}
                    id={garden._id}
                    alertsIt={garden?.weather?.dataApi?.alertsIt}
                  />
                </AccordionDetails>
                <MeteoDays
                  id={garden._id}
                  forecastday={garden.weather?.dataApi?.forecast?.forecastday}
                />
              </Accordion>
            </Grid>
          );
        })}
    </Grid>
  );
}
