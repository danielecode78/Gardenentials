import { Box, TextField } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

export default function OperationsToDo({ register, control, errors }) {
  const theme = useTheme();

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
        Operazioni da effettuare
      </Box>
      <Controller
        defaultValue={null}
        name="nextActions.nextFertilization.dateFertilizing"
        control={control}
        render={({ field, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
            <DatePicker
              minDate={new Date()}
              enableAccessibleFieldDOMStructure={false}
              sx={{ width: "100%" }}
              label="Data prossima concimazione"
              value={field.value ?? null}
              onChange={field.onChange}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                  InputLabelProps: { shrink: true },
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Note sulla prossima concimazione"
        fullWidth
        multiline
        rows={2}
        {...register("nextActions.nextFertilization.noteFertilizing")}
        error={!!errors.nextActions?.nextFertilization?.noteFertilizing}
        helperText={
          errors.nextActions?.nextFertilization?.noteFertilizing?.message
        }
      />
      <Controller
        defaultValue={null}
        name="nextActions.nextPruning.datePruning"
        control={control}
        render={({ field, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
            <DatePicker
              minDate={new Date()}
              enableAccessibleFieldDOMStructure={false}
              sx={{ width: "100%" }}
              label="Data prossima potatura"
              value={field.value ?? null}
              onChange={field.onChange}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                  InputLabelProps: { shrink: true },
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Note sulla prossima potatura"
        fullWidth
        multiline
        rows={2}
        {...register("nextActions.nextPruning.notePruning")}
        error={!!errors.nextActions?.nextPruning?.notePruning}
        helperText={errors.nextActions?.nextPruning?.notePruning?.message}
      />
      <Controller
        defaultValue={null}
        name="nextActions.nextTreatment.dateTreatment"
        control={control}
        render={({ field, fieldState }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={it}>
            <DatePicker
              minDate={new Date()}
              enableAccessibleFieldDOMStructure={false}
              sx={{ width: "100%" }}
              label="Data prossimo trattamento"
              value={field.value ?? null}
              onChange={field.onChange}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                  InputLabelProps: { shrink: true },
                },
              }}
            />
          </LocalizationProvider>
        )}
      />
      <TextField
        InputLabelProps={{ shrink: true }}
        label="Note sul prossimo trattamento"
        fullWidth
        multiline
        rows={2}
        {...register("nextActions.nextTreatment.noteTreatment")}
        error={!!errors.nextActions?.nextTreatment?.noteTreatment}
        helperText={errors.nextActions?.nextTreatment?.noteTreatment?.message}
      />
    </Box>
  );
}
