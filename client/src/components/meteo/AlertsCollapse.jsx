import { Box, Typography, IconButton, Tooltip, Collapse } from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import { useState } from "react";

export default function AlertsCollapse({ id, alertsIt }) {
  const [openAlerts, setOpenAlerts] = useState({});
  return (
    <Box>
      <Tooltip
        title={
          openAlerts[id] ? "Nascondi allerte meteo" : "Mostra allerte meteo"
        }
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
            setOpenAlerts((prev) => ({
              ...prev,
              [id]: !prev[id],
            }));
          }}
        >
          <Typography variant="h6" color="error" fontWeight={700}>
            Allerte meteo
          </Typography>

          {openAlerts[id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Box>
      </Tooltip>

      <Collapse in={openAlerts[id]} timeout={300} unmountOnExit>
        {alertsIt?.length > 0 &&
          alertsIt.map((alert, index) => {
            const period = ` dalle 
            ${new Date(alert.effective).toLocaleTimeString("it-IT")} del ${new Date(alert.effective).toLocaleDateString("it-IT")} alle ${new Date(alert.expires).toLocaleTimeString("it-IT")} del ${new Date(alert.expires).toLocaleDateString("it-IT")}`;
            return (
              <Box key={`alert-${index}`} sx={{ py: 1 }}>
                <Typography variant="body2" sx={{ pb: 0.5 }}>
                  <Box component="span" fontWeight={600}>
                    Validità:
                  </Box>
                  {period}
                </Typography>
                <Typography variant="body2">{alert.text}</Typography>
              </Box>
            );
          })}
      </Collapse>
    </Box>
  );
}
