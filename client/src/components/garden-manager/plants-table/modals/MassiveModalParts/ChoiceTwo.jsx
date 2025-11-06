import SwitchButton from "../SwitchButton";

import { Box, TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ChoiceTwo({
  choice,
  type,
  onSubmit,
  newDate,
  setNewDate,
  newNote,
  setNewNote,
  switchButton,
  setSwitchButton,
}) {
  return (
    choice === "two" && (
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
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
          <DatePicker
            enableAccessibleFieldDOMStructure={false}
            sx={{ width: "100%" }}
            label={"Data " + type}
            value={newDate}
            onChange={(e) => setNewDate(e)}
            slots={{ textField: TextField }}
            minDate={new Date()}
          />
        </LocalizationProvider>
        <TextField
          label={"Note " + type}
          placeholder={"Note " + type}
          multiline
          rows={2}
          fullWidth
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
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
