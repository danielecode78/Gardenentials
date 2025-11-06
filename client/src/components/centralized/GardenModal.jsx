import apiClient from "@/utils/apiClient";
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Fade,
  Backdrop,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useGardenContext } from "@/structure/GardenProvider";
import axios from "axios";

import { soilDescriptions } from "@/utils/descriptions";
import ImagesManager from "@/components/centralized/ImagesManager";

import CircularProgress from "@mui/material/CircularProgress";

export default function GardenModal({
  open,
  handleClose,
  onSuccess,
  isNew,
  gardenName,
  gardenLocation,
  gardenId,
  gardenSoilType,
  gardenArray,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
    setError,
    reset,
    watch,
    control,
  } = useForm();

  const theme = useTheme();
  const { setSnackbar } = useGardenContext();
  const [isLoading, setIsLoading] = useState(false);

  const [inputValue, setInputValue] = useState(
    !isNew && gardenLocation?.address ? gardenLocation.address : ""
  );
  useEffect(() => {
    if (!isNew) {
      setValue("name", gardenName);
      setValue("soilType", gardenSoilType);
      setSelectedLocation(gardenLocation);
      setInputValue(gardenLocation?.address || "");
    }
  }, [isNew, gardenName, gardenLocation, setValue]);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const timer = useRef(null);
  const [gardenImages, setGardenImages] = useState([]);
  const [gardenOldImages, setGardenOldImages] = useState([]);

  useEffect(() => {
    setGardenOldImages(gardenArray);
  }, [gardenArray]);

  const calculateLocationScore = (loc) => {
    let score = 0;
    const type = loc.type;
    const osm_type = loc.osm_type;

    if (type === "city" || type === "town" || type === "village") score += 10;
    if (type === "administrative") score += 8;
    if (type === "residential") score += 6;
    if (type === "house") score += 5;
    if (osm_type === "relation") score += 3;

    if (loc.class === "boundary" && !loc.address?.city && !loc.address?.town)
      score -= 5;

    return score;
  };

  const removeDuplicates = (locations) => {
    const unique = [];

    for (const loc of locations) {
      const isDuplicate = unique.some((existing) => {
        const distance = Math.sqrt(
          Math.pow(parseFloat(loc.lat) - parseFloat(existing.lat), 2) +
            Math.pow(parseFloat(loc.lon) - parseFloat(existing.lon), 2)
        );
        return distance < 0.001; // ~100 metri
      });

      if (!isDuplicate) {
        unique.push(loc);
      }
    }

    return unique;
  };

  const askToDatabase = (query) => {
    const cleanQuery = query.trim();
    if (cleanQuery.length > 2) {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        axios
          .get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cleanQuery)}&format=json&limit=15&addressdetails=1&accept-language=it&countrycodes=it`
          )
          .then((res) => {
            const filtered = res.data
              .filter((loc) => {
                const addr = loc.address || {};
                return (
                  addr.city ||
                  addr.town ||
                  addr.village ||
                  addr.road ||
                  addr.suburb
                );
              })
              .map((loc) => {
                const score = calculateLocationScore(loc);
                return { ...loc, score };
              })
              .sort((a, b) => b.score - a.score)
              .slice(0, 8);

            const unique = removeDuplicates(filtered);
            setLocations(unique);
          })
          .catch((err) => {
            const dataError = err.response?.data;
            console.log("Status code:", dataError?.statusCode);
            console.log("Messaggio:", dataError?.message);
            console.log("Stack:", dataError?.stack);
          });
      }, 300);
    } else {
      setLocations([]);
    }
  };

  const handleCloseAndReset = () => {
    if (isNew) {
      reset();
    }
    setInputValue(
      !isNew && gardenLocation?.address ? gardenLocation.address : ""
    );
    setLocations([]);
    setSelectedLocation(!isNew && gardenLocation ? gardenLocation : "");
    handleClose();
    setGardenImages([]);
    setGardenOldImages([]);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("location.address", selectedLocation.address);
    formData.append("location.lat", selectedLocation.lat);
    formData.append("location.lon", selectedLocation.lon);
    gardenImages.forEach((file) => {
      formData.append(`images`, file);
    });

    if (!selectedLocation?.address) {
      setError("location", {
        type: "manual",
        message: "Seleziona un luogo valido dalla lista",
      });
      return;
    }
    if (isNew) {
      await apiClient
        .post("/create-garden", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          onSuccess();
          handleCloseAndReset();
          setSnackbar({
            open: true,
            message: `"${data.name}" creato con successo!`,
            severity: "success",
          });
        })
        .catch((err) => {
          const dataError = err.response?.data;
          console.log("Status code:", dataError?.statusCode);
          console.log("Messaggio:", dataError?.message);
          console.log("Stack:", dataError?.stack);
        });
    } else {
      const newFilenames = gardenOldImages.map((img) => img.filename);
      const prevFilenames = gardenArray.map((img) => img.filename);
      const filenameToDelete = prevFilenames.filter(
        (image) => !newFilenames.includes(image)
      );
      filenameToDelete.forEach((image) => {
        formData.append(`imagesToDelete`, image);
      });
      await apiClient
        .patch(
          `/edit-garden/${gardenId}`,

          formData,

          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          handleCloseAndReset();
          setSnackbar({
            open: true,
            message: `"${data.name}" modificato con successo!`,
            severity: "success",
          });
        })
        .catch((err) => {
          const dataError = err.response?.data;
          console.log("Status code:", dataError?.statusCode);
          console.log("Messaggio:", dataError?.message);
          console.log("Stack:", dataError?.stack);
        });
    }
    setIsLoading(false);
  };

  watch("name");
  const isFormReady = () => {
    const name = getValues("name");
    return name?.trim().length > 0 && inputValue?.trim().length > 0;
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseAndReset}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              gap: 4,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              pl: 7,
            }}
          >
            <CircularProgress />
            <Typography variant="h5">Caricamento in corso...</Typography>
          </Box>
        ) : (
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxHeight: "90vh",
            }}
          >
            <Typography variant="h5" align="center">
              Crea il tuo giardino
            </Typography>

            <TextField
              label="Nome giardino"
              placeholder="Inserisci il nome del tuo giardino"
              fullWidth
              {...register("name", { required: "Campo obbligatorio" })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <Controller
              name="soilType"
              control={control}
              defaultValue="Equilibrato"
              rules={{ required: "Campo obbligatorio" }}
              render={({ field, fieldState }) => (
                <FormControl fullWidth error={!!fieldState.error}>
                  <InputLabel id="soil-label">Tipo di terreno</InputLabel>
                  <Select
                    labelId="soil-label"
                    id="soil-select"
                    label="Tipo di terreno"
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <MenuItem value="Argilloso">Argilloso</MenuItem>
                    <MenuItem value="Sabbioso">Sabbioso</MenuItem>
                    <MenuItem value="Limoso">Limoso</MenuItem>
                    <MenuItem value="Torba">Torba</MenuItem>
                    <MenuItem value="Calcareo">Calcareo</MenuItem>
                    <MenuItem value="Humifero">Humifero</MenuItem>
                    <MenuItem value="Roccioso">Roccioso</MenuItem>
                    <MenuItem value="Equilibrato">Equilibrato</MenuItem>
                  </Select>
                  <FormHelperText
                    sx={{
                      color: theme.palette.terracotta.main,
                      fontSize: "0.8rem",
                      textAlign: "justify",
                    }}
                  >
                    {soilDescriptions[field.value]}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <TextField
              label="Luogo"
              placeholder="Inserisci dove si trova il tuo giardino"
              fullWidth
              value={inputValue}
              onChange={(e) => {
                const val = e.target.value;
                setInputValue(val);
                setSelectedLocation(null);
                askToDatabase(val);
                clearErrors("location");
              }}
              error={!!errors.location}
              helperText={errors.location?.message}
            />

            {locations.length > 0 && (
              <List
                sx={{
                  maxHeight: 200,
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  borderRadius: 1,
                }}
              >
                {locations.map((loc) => {
                  const {
                    road,
                    house_number,
                    suburb,
                    city,
                    town,
                    village,
                    hamlet,
                    county,
                    state,
                  } = loc.address || {};

                  let label = "";

                  if (road) {
                    label += road;
                    if (house_number) label += ` ${house_number}`;
                    label += ", ";
                  }

                  if (suburb && suburb !== city && suburb !== town) {
                    label += `${suburb}, `;
                  }

                  const mainCity = city || town || village || hamlet;
                  if (mainCity) {
                    label += mainCity;
                    if (county && county !== mainCity) {
                      label += ` (${county})`;
                    }
                  } else if (county) {
                    label += county;
                  }

                  if (!label.trim()) {
                    const parts = loc.display_name.split(",").slice(0, 3);
                    label = parts.join(",");
                  }

                  return (
                    <ListItem key={loc.place_id} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setSelectedLocation({
                            address: label.trim(),
                            lat: loc.lat,
                            lon: loc.lon,
                          });
                          setInputValue(label.trim());
                          setLocations([]);
                          clearErrors("location");
                        }}
                      >
                        <ListItemText
                          primary={label.trim()}
                          secondary={
                            loc.type
                              ? `${loc.type} · ${loc.lat}, ${loc.lon}`
                              : `${loc.lat}, ${loc.lon}`
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            )}
            <ImagesManager
              gardenImages={gardenImages}
              setGardenImages={setGardenImages}
              gardenOldImages={gardenOldImages}
              setGardenOldImages={setGardenOldImages}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isFormReady()}
            >
              Invia
            </Button>
          </Box>
        )}
      </Fade>
    </Modal>
  );
}
