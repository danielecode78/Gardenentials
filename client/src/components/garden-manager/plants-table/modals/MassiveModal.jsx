import { massiveEditPlants } from "../fetches/massiveEditPlants";
import { switchData } from "./utils/switchData";

import ChoiceOne from "./MassiveModalParts/ChoiceOne";
import ChoiceTwo from "./MassiveModalParts/ChoiceTwo";

import {
  Box,
  Modal,
  Fade,
  Backdrop,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export default function MassiveModal({
  open,
  onClose,
  type,
  selected,
  gardenId,
  refresh,
  setSnackbar,
}) {
  const theme = useTheme();
  const [choice, setChoice] = useState("one");
  const [oldDate, setOldDate] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [oldNote, setOldNote] = useState("");
  const [newNote, setNewNote] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [switchButton, setSwitchButton] = useState(false);

  const resetFields = () => {
    setOldDate(null);
    setNewDate(null);
    setOldNote("");
    setNewNote("");
    setTreatments([]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await massiveEditPlants(
      switchData(
        type,
        selected,
        choice,
        oldDate,
        newDate,
        oldNote,
        newNote,
        treatments
      ),
      gardenId,
      refresh,
      setSnackbar,
      onClose,
      resetFields
    );
    setSwitchButton(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setSwitchButton(false);
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              fontWeight={700}
              align="center"
              paddingBottom={1}
              color="terracotta"
            >
              Gestione {type} piante selezionate
            </Typography>
            <Typography variant="body1" paddingBottom={5} align="center">
              Tutti i dati attualmente presenti saranno sovrascritti.
            </Typography>
            <Box component="fieldset" sx={{ borderRadius: 2 }}>
              <Typography
                component="legend"
                variant="h6"
                paddingBottom={2}
                align="center"
                color="sage"
                paddingX={2}
              >
                Scegli il tipo di modifica che vuoi effettuare
              </Typography>
              <Tabs
                variant="fullWidth"
                value={choice}
                onChange={(event, newValue) => {
                  setSwitchButton(false);
                  setChoice(newValue);
                }}
                aria-label="Azioni massive piante"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: theme.palette.terracotta.main,
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: theme.palette.terracotta.main,
                    fontWeight: 700,
                  },
                }}
              >
                <Tab
                  value="one"
                  label={
                    type === "trattamento" ? "Già effettuati" : "Già effettuata"
                  }
                />
                <Tab value="two" label="Da effettuare" />
              </Tabs>
              <ChoiceOne
                choice={choice}
                type={type}
                onSubmit={onSubmit}
                oldDate={oldDate}
                setOldDate={setOldDate}
                treatments={treatments}
                setTreatments={setTreatments}
                oldNote={oldNote}
                setOldNote={setOldNote}
                switchButton={switchButton}
                setSwitchButton={setSwitchButton}
              />
              <ChoiceTwo
                choice={choice}
                type={type}
                onSubmit={onSubmit}
                newDate={newDate}
                setNewDate={setNewDate}
                newNote={newNote}
                setNewNote={setNewNote}
                switchButton={switchButton}
                setSwitchButton={setSwitchButton}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
