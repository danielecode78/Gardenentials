import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Collapse,
  Card,
  CardActionArea,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import MeteoHours from "@/components/meteo/MeteoHours";

import { useState } from "react";

export default function MeteoDays({ id, forecastday }) {
  const [openDays, setOpenDays] = useState({});
  const [openHours, setOpenHours] = useState({});

  return (
    <Box>
      <Tooltip
        title={openDays[id] ? "Nascondi previsioni" : "Mostra previsioni"}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            justifyContent: "center",
            pb: 1,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            setOpenDays((prev) => ({
              ...prev,
              [id]: !prev[id],
            }));
          }}
        >
          <Typography variant="h6" color="primary" fontWeight={700}>
            Previsioni
          </Typography>

          {openDays[id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
      </Tooltip>
      <Collapse in={openDays[id]} timeout={300} unmountOnExit>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column" },
            justifyContent: "space-between",
            p: 2,
            gap: 2,
          }}
        >
          {forecastday?.length > 0 &&
            forecastday.map((day, index) => {
              const idHours = id + index;
              return (
                <Card key={idHours}>
                  <CardActionArea
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenHours((prev) => ({
                        ...prev,
                        [idHours]: !prev[idHours],
                      }));
                    }}
                    sx={{
                      display: "flex",
                      gap: { xs: 0, sm: 2 },
                      justifyContent: "unset",
                      alignItems: "unset",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100px",
                        backgroundColor: "#f5f5f580",
                        borderRadius: 1,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        textAlign="center"
                        fontWeight={500}
                      >
                        {new Date(day.date).toLocaleDateString("it-IT")}
                      </Typography>
                      <Box>
                        <Box component="img" src={day.day.condition.icon} />
                      </Box>
                      <Typography variant="body2" textAlign="center">
                        {day.day.condition.text}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        p: 1,
                        columnCount: { xs: 1, sm: 2, md: 3 },
                        columnWidth: "150px",
                        columnGap: { xs: 2, sm: 5, md: 6, lg: 15, xl: 6 },
                      }}
                    >
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Alba:
                        </Box>{" "}
                        {day.astro.sunrise}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Tramonto:
                        </Box>{" "}
                        {day.astro.sunset}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Umidità media:
                        </Box>{" "}
                        {day.day.avghumidity}%
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          T. min/max:
                        </Box>{" "}
                        {day.day.mintemp_c}°/{day.day.maxtemp_c}°
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Pioggia:
                        </Box>{" "}
                        {day.day.totalprecip_mm} mm
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Prob. pioggia:
                        </Box>{" "}
                        {day.day.daily_chance_of_rain}%
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Neve:
                        </Box>{" "}
                        {day.day.totalsnow_cm} cm
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Prob. neve:
                        </Box>{" "}
                        {day.day.daily_chance_of_snow}%
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Vento:
                        </Box>{" "}
                        {day.day.maxwind_kph} km/h
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" fontWeight={600}>
                          Visibilità:
                        </Box>{" "}
                        {day.day.avgvis_km} km
                      </Typography>
                    </Box>
                  </CardActionArea>
                  <MeteoHours
                    idHours={idHours}
                    day={day}
                    openHours={openHours}
                  />
                </Card>
              );
            })}
        </Box>
      </Collapse>
    </Box>
  );
}
