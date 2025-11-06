import { Box, Typography, Collapse, Card } from "@mui/material";

export default function MeteoHours({ idHours, day, openHours }) {
  const now = Number(
    new Date().toLocaleTimeString("it-IT", {
      hour: "2-digit",
    })
  );
  const today = new Date().toLocaleDateString("it-IT");
  const date = new Date(day.date).toLocaleDateString("it-IT");

  return (
    <Box>
      <Collapse in={openHours[idHours]} timeout={300} unmountOnExit>
        <Box
          sx={{
            pt: 1,
            columnCount: 1,
            columnGap: 1,
          }}
        >
          {day?.hour?.length > 0 &&
            day.hour.slice(today === date ? now : 0).map((hour, index) => {
              return (
                <Box
                  key={index}
                  sx={{ p: 1, borderTop: "1px solid #d0d0d0ff" }}
                >
                  <Box
                    sx={{
                      columnCount: { xs: 2, sm: 3, md: 4, lg: 5, xl: 4 },
                      columnGap: 1,
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {`${new Date(hour.time).toLocaleTimeString("it-IT", {
                        hour: "2-digit",
                        minute: "numeric",
                      })}`}
                    </Typography>
                    <Box
                      component="img"
                      src={hour.condition.icon}
                      width={40}
                      height={40}
                    />
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        {hour.condition.text}
                      </Box>
                    </Typography>

                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Temp:
                      </Box>{" "}
                      {hour.temp_c}°
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Percepita:
                      </Box>{" "}
                      {hour.feelslike_c}°
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Umidità:
                      </Box>{" "}
                      {hour.humidity}%
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Nuvolosità:
                      </Box>{" "}
                      {hour.cloud}%
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Precipitazioni:
                      </Box>{" "}
                      {hour.precip_mm} mm
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Prob. pioggia:
                      </Box>{" "}
                      {hour.chance_of_rain}%
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Neve:
                      </Box>{" "}
                      {hour.snow_cm} cm
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Prob. neve:
                      </Box>{" "}
                      {hour.chance_of_snow}%
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Vento:
                      </Box>{" "}
                      {hour.wind_kph} km/h
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Raffiche:
                      </Box>{" "}
                      {hour.gust_kph} km/h
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Provenienza:
                      </Box>{" "}
                      {hour.wind_dir}
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        Visibilità:
                      </Box>{" "}
                      {hour.vis_km} km
                    </Typography>
                    <Typography variant="body2">
                      <Box component="span" fontWeight={600}>
                        UV:
                      </Box>{" "}
                      {hour.uv}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Collapse>
    </Box>
  );
}
