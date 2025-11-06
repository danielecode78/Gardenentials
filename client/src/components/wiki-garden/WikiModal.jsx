import { categories } from "@/components/wiki-garden/utils/categories";
import { createGuide } from "./fetches/createGuide";
import { useState } from "react";

import {
  Box,
  Paper,
  Modal,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

export default function WikiModal({
  setOpenModalCreateGuide,
  openModalCreateGuide,
  getGuides,
  setGuides,
  setSearchResults,
}) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputCategory, setInputCategory] = useState("Non specificata");
  const [generating, setGenerating] = useState(false);

  const promptGuide = {
    title: inputTitle,
    description: inputDescription,
    category: inputCategory,
  };

  const finallyCreateGuide = () => {
    setGenerating(false);
    setOpenModalCreateGuide(false);
    setInputTitle("");
    setInputDescription("");
    setInputCategory("");
    setSearchResults([]);
    getGuides(setGuides);
  };

  return (
    <Modal
      open={openModalCreateGuide}
      onClose={() => setOpenModalCreateGuide(false)}
      closeAfterTransition
    >
      <Fade in={openModalCreateGuide} timeout={500} unmountOnExit>
        <Paper
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            overflowY: "auto",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 2,
          }}
        >
          {!generating ? (
            <>
              <Typography
                variant="h5"
                color="primary"
                fontWeight={700}
                textAlign="center"
              >
                Crea articolo con AI
              </Typography>
              <TextField
                value={inputTitle}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Titolo"
                variant="outlined"
                onChange={(e) => setInputTitle(e.target.value)}
              />
              <TextField
                value={inputDescription}
                multiline
                rows={4}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                label="Descrizione articolo"
                variant="outlined"
                onChange={(e) => setInputDescription(e.target.value)}
              />
              <FormControl>
                <InputLabel id="category-select-label" shrink={true}>
                  Categoria
                </InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  value={inputCategory}
                  onChange={(e) => setInputCategory(e.target.value)}
                  autoWidth
                  label="Categoria"
                  displayEmpty
                >
                  {categories.map((el, index) => (
                    <MenuItem key={el} value={el}>
                      {el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="button"
                fullWidth
                onClick={() =>
                  createGuide(promptGuide, setGenerating, finallyCreateGuide)
                }
              >
                Genera Articolo
              </Button>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography variant="h6" color="primary">
                Generazione articolo AI
              </Typography>
              <CircularProgress />
            </Box>
          )}
        </Paper>
      </Fade>
    </Modal>
  );
}
