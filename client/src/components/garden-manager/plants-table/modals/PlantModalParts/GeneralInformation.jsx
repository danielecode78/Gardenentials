import apiClient from "@/utils/apiClient";
import { createBotanicPlant } from "../../fetches/createBotanicPlant";
import { searchBotanicPlant } from "../../fetches/searchBotanicPlant";
import { exposureDescriptions, phDescriptions } from "@/utils/descriptions";

import {
  Box,
  Button,
  TextField,
  Modal,
  Backdrop,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Typography,
  FormHelperText,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it } from "date-fns/locale";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

import { useTheme } from "@mui/material/styles";

import { useState, useEffect, useRef } from "react";

export default function GeneralInformation({
  register,
  setValue,
  watch,
  errors,
  control,
  reset,
  id,
  setIdPlant,
  isNew,
  idToEdit,
  setSnackbar,
}) {
  const theme = useTheme();
  const timer = useRef(null);
  const [alertPlantExist, setAlertPlantExist] = useState(false);
  const [openModalAi, setOpenModalAi] = useState(false);
  const [dbPlants, setDbPlants] = useState([]);
  const [creatingPlant, setCreatingPlant] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [promptPlant, setPromptPlant] = useState({
    name: "",
    variety: "",
  });

  const submitRequestAi = async () => {
    const result = await searchBotanicPlant(
      promptPlant.name,
      setCreatingPlant,
      setDbPlants
    );

    if (result.length > 0) {
      setAlertPlantExist(true);
    } else {
      createBotanicPlant(
        promptPlant,
        setAlertPlantExist,
        setDbPlants,
        setCreatingPlant,
        setSnackbar,
        setOpenModalAi,
        setPromptPlant
      );
    }
  };

  useEffect(() => {
    if (inputValue && inputValue?.length > 3) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        searchBotanicPlant(inputValue, setCreatingPlant, setDbPlants);
      }, 300);
    } else {
      setDbPlants([]);
      return;
    }
  }, [inputValue]);

  const normalizeDates = (obj) => {
    if (Array.isArray(obj)) return obj.map(normalizeDates);

    if (obj && typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          if (typeof value === "string" && !isNaN(Date.parse(value))) {
            return [key, new Date(value)];
          }
          return [key, normalizeDates(value)];
        })
      );
    }

    return obj;
  };

  useEffect(() => {
    if (isNew) {
      reset({});
      return;
    }

    if (idToEdit) {
      apiClient.get(`/plant/${id}/${idToEdit}`).then((res) => {
        const data = res.data.plant;
        const formattedData = normalizeDates(data);
        reset(formattedData);
        setValue("name", formattedData.name);
        setInputValue(formattedData.name);
        setIdPlant(formattedData.plant);
      });
    }
  }, [isNew, idToEdit, id, reset, setValue]);

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
        Informazioni generali
      </Box>
      <Grid container size={12} spacing={2}>
        <Grid
          container
          spacing={2}
          size={{ xs: 12, md: 6 }}
          alignContent="flex-start"
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: 0.5,
              position: "relative",
            }}
          >
            {/* INIZIO PARTE RICERCA */}

            <Autocomplete
              freeSolo
              inputValue={inputValue}
              fullWidth
              disablePortal
              options={dbPlants}
              getOptionLabel={(opt) => {
                if (!opt || typeof opt !== "object") return "";
                const parts = [opt.commonName, opt.commonNameVariety].filter(
                  Boolean
                );
                return parts.length > 0 ? parts.join(" - ") : "";
              }}
              onBlur={() => {
                setDbPlants([]);
              }}
              onInputChange={(e, newValue) => setInputValue(newValue)}
              onChange={(e, newValue) => {
                if (!newValue) {
                  setValue("name", "");
                  setIdPlant(null);
                  return;
                }
                const parts = [
                  newValue.commonName,
                  newValue.commonNameVariety,
                ].filter(Boolean);
                const completeName = parts.join(" - ");
                setValue("name", completeName);
                setIdPlant(newValue._id);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Piante"
                  InputLabelProps={{ shrink: !!inputValue }}
                />
              )}
            />

            <Tooltip title="Inserisci nuova pianta nel db">
              <IconButton
                onClick={() => setOpenModalAi(true)}
                sx={{ width: "60px", height: "60px" }}
              >
                <img
                  src="/create-plant.png"
                  alt="irrigazione"
                  width={48}
                  height={48}
                />
              </IconButton>
            </Tooltip>
            <Modal
              open={openModalAi}
              onClose={() => {
                setOpenModalAi(false);
                setAlertPlantExist(false);
                setDbPlants([]);
                setPromptPlant({
                  name: "",
                  variety: "",
                });
              }}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 500 } }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  overflowY: "auto",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {creatingPlant ? (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      // color: theme.palette.primary.main,
                    }}
                  >
                    <Typography color="primary">
                      Generazione AI in corso...
                    </Typography>
                    <CircularProgress />
                  </Box>
                ) : alertPlantExist && dbPlants.length > 0 ? (
                  <>
                    <Typography id="modal-Ai" variant="h6" component="h2">
                      🌱 Sono state trovate delle piante con lo stesso nome.
                      Confermare se si desidera procedere con la creazione della
                      nuova pianta.
                    </Typography>
                    <List>
                      {dbPlants.map((el) => (
                        <ListItem key={el._id} disablePadding>
                          <ListItemText
                            primary={`${el.commonName} - ${el.commonNameVariety}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => {
                          setOpenModalAi(false);
                          setAlertPlantExist(false);
                          setDbPlants([]);
                          setPromptPlant({
                            name: "",
                            variety: "",
                          });
                        }}
                        disabled={promptPlant?.name?.length < 4}
                        color="terracotta"
                      >
                        Annulla
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() =>
                          createBotanicPlant(
                            promptPlant,
                            setAlertPlantExist,
                            setDbPlants,
                            setCreatingPlant,
                            setSnackbar,
                            setOpenModalAi,
                            setPromptPlant
                          )
                        }
                        disabled={promptPlant?.name?.length < 4}
                      >
                        Genera pianta
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography id="modal-Ai" variant="h6" component="h2">
                      Inserisci una nuova pianta
                    </Typography>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      label="Nome pianta"
                      value={promptPlant.name}
                      onChange={(e) => {
                        const capitalized =
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1).toLowerCase();
                        setPromptPlant((prev) => ({
                          ...prev,
                          name: capitalized,
                        }));
                      }}
                      error={
                        promptPlant?.name?.length > 0 &&
                        promptPlant?.name?.length < 4
                      }
                      helperText={
                        promptPlant?.name?.length > 0 &&
                        promptPlant?.name?.length < 4
                          ? "Inserisci almeno 4 caratteri"
                          : ""
                      }
                    />
                    <TextField
                      autoComplete="off"
                      InputLabelProps={{
                        shrink: true,
                        autoComplete: "off",
                      }}
                      label="Varietà"
                      value={promptPlant.variety}
                      onChange={(e) => {
                        const capitalized =
                          e.target.value.charAt(0).toUpperCase() +
                          e.target.value.slice(1).toLowerCase();
                        setPromptPlant((prev) => ({
                          ...prev,
                          variety: capitalized,
                        }));
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={submitRequestAi}
                      disabled={promptPlant?.name?.length < 4}
                    >
                      Genera pianta
                    </Button>
                  </>
                )}
              </Box>
            </Modal>
          </Box>

          <Controller
            defaultValue={null}
            name="history.plantedAt"
            control={control}
            render={({ field, fieldState }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={it}
              >
                <DatePicker
                  maxDate={new Date()}
                  enableAccessibleFieldDOMStructure={false}
                  label="Quando è stata piantata?"
                  sx={{ width: "100%" }}
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
          <Controller
            name="healthStatus"
            control={control}
            defaultValue="Sana"
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error}>
                <InputLabel id="health-label">
                  Stato di salute della pianta
                </InputLabel>
                <Select
                  labelId="health-label"
                  id="health-select"
                  label="Stato di salute della pianta"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value="Sana">Sana</MenuItem>
                  <MenuItem value="Stressata">Stressata</MenuItem>
                  <MenuItem value="Malata">Malata</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="lightExposure"
            control={control}
            defaultValue="Pieno sole"
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error}>
                <InputLabel id="lightExposure-label">
                  Esposizione al sole
                </InputLabel>
                <Select
                  labelId="lightExposure-label"
                  id="lightExposure-select"
                  label="Esposizione al sole"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value="Pieno sole">Pieno sole</MenuItem>
                  <MenuItem value="Mezz'ombra">Mezz'ombra</MenuItem>
                  <MenuItem value="Ombra">Ombra</MenuItem>
                </Select>
                <FormHelperText
                  sx={{
                    color: theme.palette.terracotta.main,
                    fontSize: "0.8rem",
                  }}
                >
                  {exposureDescriptions[field.value]}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Controller
              defaultValue={null}
              name="soilPh.date"
              control={control}
              render={({ field, fieldState }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={it}
                >
                  <DatePicker
                    maxDate={new Date()}
                    enableAccessibleFieldDOMStructure={false}
                    sx={{ width: "100%" }}
                    label="Data misurazione pH"
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
            <Controller
              name="soilPh.value"
              control={control}
              defaultValue="Nessuna misurazione"
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel id="soilPh-label">
                    Ultima misurazione pH del terreno
                  </InputLabel>
                  <Select
                    labelId="soilPh-label"
                    id="soilPh-select"
                    label="Ultima misurazione Ph del terreno"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <MenuItem value="< 5.5">&lt; 5.5</MenuItem>
                    <MenuItem value="5.5 - 6.5">5.5 - 6.5</MenuItem>
                    <MenuItem value="6.5 - 7.5">6.5 - 7.5</MenuItem>
                    <MenuItem value="7.5 - 8.0">7.5 - 8.0</MenuItem>
                    <MenuItem value="> 8.0">&gt; 8.0</MenuItem>
                    <MenuItem value="Nessuna misurazione">Nessuna</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Box>
          <FormHelperText
            sx={{
              color: theme.palette.terracotta.main,
              fontSize: "0.8rem",
            }}
          >
            {phDescriptions[watch("soilPh.value")]}
          </FormHelperText>
        </Grid>

        <Grid
          container
          spacing={2}
          size={{ xs: 12, md: 6 }}
          alignContent="flex-start"
        >
          <Controller
            defaultValue={null}
            name="history.lastFertilized.dateFertilizing"
            control={control}
            render={({ field, fieldState }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={it}
              >
                <DatePicker
                  maxDate={new Date()}
                  enableAccessibleFieldDOMStructure={false}
                  sx={{ width: "100%" }}
                  label="Data ultima concimatura"
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
            label="Note sulla concimazione"
            multiline
            rows={2}
            fullWidth
            {...register("history.lastFertilized.noteFertilizing")}
            error={!!errors.history?.lastFertilized?.noteFertilizing}
            helperText={
              errors.history?.lastFertilized?.noteFertilizing?.message
            }
          />
          <Controller
            defaultValue={null}
            name="history.lastPruned.datePruning"
            control={control}
            render={({ field, fieldState }) => (
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={it}
              >
                <DatePicker
                  maxDate={new Date()}
                  enableAccessibleFieldDOMStructure={false}
                  sx={{ width: "100%" }}
                  label="Data ultima potatura"
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
            label="Note sulla potatura"
            multiline
            rows={2}
            fullWidth
            {...register("history.lastPruned.notePruning")}
            error={!!errors.history?.lastPruned?.notePruning}
            helperText={errors.history?.lastPruned?.notePruning?.message}
          />
          <TextField
            InputLabelProps={{ shrink: true }}
            label="Note aggiuntive sulla pianta"
            fullWidth
            multiline
            rows={2}
            {...register("notes")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
