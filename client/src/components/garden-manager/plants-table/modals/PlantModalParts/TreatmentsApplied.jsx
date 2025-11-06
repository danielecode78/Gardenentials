import {
  Box,
  TextField,
  List,
  ListItemButton,
  IconButton,
  Collapse,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, Fragment } from "react";
import { useTheme } from "@mui/material/styles";

export default function TreatmentsApplied({ setValue, getValues, watch }) {
  const theme = useTheme();
  const [openTreatment, setOpenTreatment] = useState({});
  const [oldTreatment, setOldTreatment] = useState({});

  return (
    <Box
      component="fieldset"
      sx={{
        border: "1px solid",
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
      }}
    >
      <Box
        component="legend"
        sx={{ color: theme.palette.sage.main, fontWeight: 600 }}
      >
        Trattamenti effettuati
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
          <DatePicker
            maxDate={new Date()}
            enableAccessibleFieldDOMStructure={false}
            sx={{ width: "100%" }}
            label="Data trattamento"
            value={oldTreatment?.dateTreatment ?? null}
            onChange={(newValue) =>
              setOldTreatment({
                ...oldTreatment,
                dateTreatment: newValue ?? null,
              })
            }
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                InputLabelProps: { shrink: true },
              },
            }}
          />
        </LocalizationProvider>
        <Tooltip title="Aggiungi">
          <IconButton
            sx={{ my: "auto" }}
            onClick={() => {
              const currentTreatments = getValues("history.treatments") ?? [];

              const newTreatment = {
                ...oldTreatment,
                dateTreatment: oldTreatment?.dateTreatment,
              };

              const updated = [...currentTreatments, newTreatment].sort(
                (a, b) => b.dateTreatment - a.dateTreatment
              );

              setValue("history.treatments", updated);
              setOldTreatment({
                dateTreatment: null,
                noteTreatment: "",
              });
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Note sul trattamento effettuato"
        fullWidth
        multiline
        rows={2}
        value={oldTreatment?.noteTreatment}
        onChange={(e) =>
          setOldTreatment({
            ...oldTreatment,
            noteTreatment: e.target.value,
          })
        }
      />
      <List>
        {watch("history.treatments")?.map((el, index) => (
          <Fragment key={index}>
            <Box sx={{ display: "flex" }}>
              <ListItemButton
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
                onClick={() =>
                  setOpenTreatment((prev) => ({
                    ...prev,
                    [index]: !prev[index],
                  }))
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography>
                    Trattamento del{" "}
                    {el.dateTreatment?.toLocaleDateString("it-IT")}
                  </Typography>
                  {openTreatment[index] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </Box>
              </ListItemButton>
              <Tooltip title="Elimina">
                <IconButton
                  onClick={() => {
                    const currentTreatments =
                      getValues("history.treatments") ?? [];
                    setValue(
                      "history.treatments",
                      currentTreatments.filter((el, i) => i !== index)
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Collapse in={openTreatment[index]} timeout={300} unmountOnExit>
              <Typography variant="body2" sx={{ pl: 2 }}>
                {el.noteTreatment}
              </Typography>
            </Collapse>
          </Fragment>
        ))}
      </List>
    </Box>
  );
}
