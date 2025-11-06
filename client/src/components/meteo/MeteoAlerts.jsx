import { Badge, Tooltip } from "@mui/material";
import AlertIcon from "@mui/icons-material/Thunderstorm";

export default function MeteoAlerts({ alerts }) {
  return (
    <Tooltip title="Allerte meteo">
      <Badge
        badgeContent={alerts}
        color="error"
        sx={{
          "& .MuiBadge-badge": {
            right: -2,
            top: 4,
          },
        }}
      >
        <AlertIcon />
      </Badge>
    </Tooltip>
  );
}
