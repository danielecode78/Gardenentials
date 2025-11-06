import SwitchButton from "../SwitchButton";

import {
  Box,
  Typography,
  TextField,
  Tooltip,
  IconButton,
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import {
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Fragment, useState } from "react";

export default function ChoiceOne({
  choice,
  type,
  onSubmit,
  oldDate,
  setOldDate,
  treatments,
  setTreatments,
  oldNote,
  setOldNote,
  switchButton,
  setSwitchButton,
}) {
  const [openTreatment, setOpenTreatment] = useState([]);

  return (
    choice === "one" && (
      <Box
        component="form"
        autoComplete="off"
        onSubmit={onSubmit}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
            <DatePicker
              enableAccessibleFieldDOMStructure={false}
              sx={{ width: "100%" }}
              label={"Data " + type}
              value={oldDate}
              onChange={(e) => setOldDate(e)}
              slots={{ textField: TextField }}
              maxDate={new Date()}
            />
          </LocalizationProvider>
          {type === "trattamento" && (
            <Tooltip title="Aggiungi">
              <IconButton
                sx={{ my: "auto" }}
                onClick={() => {
                  const newArray = [
                    ...treatments,
                    {
                      dateTreatment: oldDate,
                      noteTreatment: oldNote,
                    },
                  ];
                  newArray.sort((a, b) => b.dateTreatment - a.dateTreatment);
                  setTreatments(newArray);
                  setOldDate(null);
                  setOldNote("");
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <TextField
          label={"Note " + type}
          placeholder={"Note " + type}
          multiline
          rows={2}
          fullWidth
          value={oldNote}
          onChange={(e) => setOldNote(e.target.value)}
        />
        {type === "trattamento" && (
          <List>
            {treatments?.map((el, index) => (
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
                        <ArrowUpIcon />
                      ) : (
                        <ArrowDownIcon />
                      )}
                    </Box>
                  </ListItemButton>
                  <Tooltip title="Elimina">
                    <IconButton
                      onClick={() => {
                        const newArray = treatments.filter((obj) => obj !== el);
                        setTreatments(newArray);
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
        )}
        <SwitchButton
          switchButton={switchButton}
          setSwitchButton={setSwitchButton}
          type={type}
          choice={choice}
        />
      </Box>
    )
  );
}
