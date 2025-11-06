import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import { useState } from "react";

export default function HistoryCollpase({ rowId, history, soilPh }) {
  const [openHistory, setOpenHistory] = useState({});
  const [openTreatments, setOpenTreatments] = useState({});

  return (
    <Box sx={{ margin: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Storico
        </Typography>
        <Tooltip
          title={openHistory[rowId] ? "Nascondi storico" : "Mostra storico"}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpenHistory((prev) => ({
                ...prev,
                [rowId]: !prev[rowId],
              }));
            }}
          >
            {openHistory[rowId] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={openHistory[rowId]} timeout={300} unmountOnExit>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head" sx={{ width: "25%" }}>
                Ultima concimazione
              </TableCell>
              <TableCell sx={{ width: "18%" }}>
                {history?.lastFertilized?.dateFertilizing
                  ? new Date(
                      history.lastFertilized.dateFertilizing
                    ).toLocaleDateString("it-IT")
                  : "Nessuna"}
              </TableCell>
              <TableCell variant="head" sx={{ width: "10%" }}>
                {history?.lastFertilized?.noteFertilizing ? "Note" : null}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {history?.lastFertilized?.noteFertilizing
                  ? history.lastFertilized.noteFertilizing
                  : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Ultima potatura</TableCell>
              <TableCell>
                {history?.lastPruned?.datePruning
                  ? new Date(history.lastPruned.datePruning).toLocaleDateString(
                      "it-IT"
                    )
                  : "Nessuna"}
              </TableCell>
              <TableCell variant="head">
                {history?.lastPruned?.notePruning ? "Note" : null}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {history?.lastPruned?.notePruning
                  ? history.lastPruned.notePruning
                  : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Ultimo pH</TableCell>
              <TableCell>
                {soilPh?.date
                  ? new Date(soilPh.date).toLocaleDateString("it-IT")
                  : "Nessuna"}
              </TableCell>
              <TableCell variant="head">
                {soilPh?.value ? "Valore" : null}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {soilPh?.value ? soilPh.value : null}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell variant="head" sx={{ width: "28%" }}>
                Trattamenti effettuati
              </TableCell>

              <TableCell>
                {history?.treatments?.length > 0 ? (
                  <Tooltip
                    title={
                      openTreatments[rowId]
                        ? "Nascondi trattamenti"
                        : "Mostra trattamenti"
                    }
                  >
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenTreatments((prev) => ({
                          ...prev,
                          [rowId]: !prev[rowId],
                        }));
                      }}
                    >
                      {openTreatments[rowId] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                ) : (
                  "Nessuno"
                )}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                <Collapse
                  in={openTreatments[rowId]}
                  timeout={300}
                  unmountOnExit
                >
                  <Box sx={{ margin: 1 }}>
                    <Table size="small" sx={{ width: "100%" }}>
                      <TableBody>
                        {history?.treatments?.length > 0 &&
                          history.treatments.map((treatment) => (
                            <TableRow key={treatment._id}>
                              <TableCell variant="head" sx={{ width: "10%" }}>
                                Data
                              </TableCell>
                              <TableCell sx={{ width: "25%" }}>
                                {treatment.dateTreatment &&
                                  new Date(
                                    treatment.dateTreatment
                                  ).toLocaleDateString("it-IT")}
                              </TableCell>
                              <TableCell variant="head" sx={{ width: "10%" }}>
                                Note
                              </TableCell>
                              <TableCell
                                sx={{
                                  maxWidth: 300,
                                  whiteSpace: "normal",
                                  wordBreak: "break-word",
                                  overflowWrap: "anywhere",
                                }}
                              >
                                {treatment.noteTreatment}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Collapse>
    </Box>
  );
}
