import { Typography, Box } from "@mui/material";
import MeteoAlerts from "./MeteoAlerts";

export default function MeteoSummary({ current, location, name, alerts }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0.7, sm: 1.5 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 0.7, sm: 3 },
            alignItems: "baseline",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, fontSize: "1rem" }}
            >
              {current?.condition?.text}
            </Typography>
            {alerts > 0 && <MeteoAlerts alerts={alerts} />}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 0.7, sm: 1.5 },
            alignItems: "baseline",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
          >
            {location}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
          >
            (aggiornato{" "}
            {new Date(current?.last_updated).toLocaleTimeString("it-IT", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            )
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box component="img" src={current?.condition.icon} />
      </Box>
    </Box>
  );
}
