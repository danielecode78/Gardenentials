import { airQuality, uvIndex } from "@/components/meteo/utils/weatherValues";
import AlertsCollapse from "./AlertsCollapse";

import { Typography, Box } from "@mui/material";

export default function MeteoCurrentDetails({ current, id, alertsIt }) {
  const airQualityValue = current?.air_quality["us-epa-index"];
  return (
    <Box>
      {alertsIt?.length > 0 && <AlertsCollapse id={id} alertsIt={alertsIt} />}
      <Box
        sx={{
          columnCount: { xs: 1, sm: 2, md: 3, lg: 4, xl: 3 },
          columnGap: 1,
        }}
      >
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Copertura nuvolosa:
          </Box>{" "}
          {current?.cloud}%
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Precipitazioni totali:
          </Box>{" "}
          {current?.precip_mm} mm
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Temperatura attuale:
          </Box>{" "}
          {current?.temp_c}°
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Temperatura percepita:
          </Box>{" "}
          {current?.feelslike_c}°
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Umidità:
          </Box>{" "}
          {current?.humidity}%
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Indice UV:
          </Box>{" "}
          {uvIndex(current?.uv)}
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Vento:
          </Box>{" "}
          {current?.wind_kph} km/h
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Raffiche massime:
          </Box>{" "}
          {current?.gust_kph} km/h
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Provenienza vento:
          </Box>{" "}
          {current?.wind_dir}
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Qualità dell'aria:
          </Box>{" "}
          {airQuality[airQualityValue]}
        </Typography>
        <Typography variant="body1">
          <Box component="span" fontWeight={600}>
            Visibilità:
          </Box>{" "}
          {current?.vis_km} km
        </Typography>
      </Box>
    </Box>
  );
}
