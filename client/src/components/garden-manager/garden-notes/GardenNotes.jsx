import { editFields } from "@/components/garden-manager/fetches/editFields";

import {
  Box,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  TextField,
} from "@mui/material";
import { Done as DoneIcon, Clear as ClearIcon } from "@mui/icons-material";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";

export default function ({ garden, id, refresh }) {
  const [editNotes, setEditNotes] = useState("");
  const [activeNotes, setActiveNotes] = useState(false);

  const inputNotes = useRef(null);

  const theme = useTheme();

  useEffect(() => {
    if (activeNotes) {
      inputNotes.current?.focus();
    }
    const length = inputNotes.current?.value.length;
    inputNotes.current?.setSelectionRange(length, length);
  }, [activeNotes]);

  return (
    <Paper
      sx={{
        height: "100%",
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title="Modifica annotazioni">
            <IconButton
              onClick={() => {
                setEditNotes(garden.notes || "");
                setActiveNotes(true);
              }}
              sx={{ width: 40, height: 40 }}
            >
              <Box
                component="img"
                src="/blocknotes.png"
                sx={{ height: 40, width: 40 }}
              />
            </IconButton>
          </Tooltip>
          <Typography variant="h5">Annotazioni</Typography>
        </Box>
        {activeNotes && (
          <Box>
            <Tooltip title="Annulla">
              <IconButton
                onClick={() => {
                  setActiveNotes(false);
                }}
                sx={{ width: 40, height: 40 }}
              >
                <ClearIcon
                  fontSize="large"
                  sx={{
                    color: theme.palette.terracotta.main,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Conferma">
              <IconButton
                onClick={async () => {
                  const editObj = { field: "notes", value: editNotes };
                  await editFields(editObj, id);
                  setActiveNotes(false);
                  refresh();
                }}
                sx={{ width: 40, height: 40 }}
              >
                <DoneIcon fontSize="large" color="primary" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!activeNotes ? (
          <Typography
            variant="body"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {garden.notes}
          </Typography>
        ) : (
          <TextField
            fullWidth
            inputRef={inputNotes}
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const editObj = { field: "notes", value: editNotes };
                await editFields(editObj, id);
                setActiveNotes(false);
                refresh();
              }
            }}
            multiline
            rows={5}
          />
        )}
        {!activeNotes && !garden.notes ? (
          <Typography variant="body" sx={{ opacity: 0.4 }}>
            Nessuna annotazione presente.
          </Typography>
        ) : null}
      </Box>
    </Paper>
  );
}
