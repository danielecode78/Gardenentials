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

export default function OperationsCollapse({
  rowId,
  nextActions,
  dateFertilizing,
  noteFertilizing,
  datePruning,
  notePruning,
  dateTreatment,
  noteTreatment,
}) {
  const [openActions, setOpenActions] = useState({});

  return (
    <Box sx={{ margin: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Operazioni da effettuare
        </Typography>
        <Tooltip
          title={
            openActions[rowId]
              ? "Nascondi operazioni da effettuare"
              : "Mostra operazioni da effettuare"
          }
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpenActions((prev) => ({
                ...prev,
                [rowId]: !prev[rowId],
              }));
            }}
          >
            {openActions[rowId] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={openActions[rowId]} timeout={300} unmountOnExit>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head" sx={{ width: "28%" }}>
                Prossima concimazione
              </TableCell>
              <TableCell sx={{ width: "15%" }}>
                {nextActions?.nextFertilization?.dateFertilizing
                  ? new Date(
                      nextActions.nextFertilization.dateFertilizing
                    ).toLocaleDateString("it-IT")
                  : "Nessuna"}
              </TableCell>
              <TableCell variant="head" sx={{ width: "10%" }}>
                {nextActions?.nextFertilization?.noteFertilizing
                  ? "Note"
                  : null}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {nextActions?.nextFertilization?.noteFertilizing
                  ? nextActions.nextFertilization.noteFertilizing
                  : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" sx={{ width: "30%" }}>
                Prossima potatura
              </TableCell>
              <TableCell>
                {nextActions?.nextPruning?.datePruning
                  ? new Date(
                      nextActions.nextPruning.datePruning
                    ).toLocaleDateString("it-IT")
                  : "Nessuna"}
              </TableCell>
              <TableCell variant="head">
                {nextActions?.nextPruning?.notePruning ? "Note" : null}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {nextActions?.nextPruning?.notePruning
                  ? nextActions.nextPruning.notePruning
                  : null}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" sx={{ width: "30%" }}>
                Prossimo trattamento
              </TableCell>
              <TableCell>
                {nextActions?.nextTreatment?.dateTreatment
                  ? new Date(
                      nextActions.nextTreatment.dateTreatment
                    ).toLocaleDateString("it-IT")
                  : "Nessuno"}
              </TableCell>
              <TableCell variant="head">
                {nextActions?.nextTreatment?.noteTreatment ? "Note" : null}
              </TableCell>
              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {nextActions?.nextTreatment?.noteTreatment
                  ? nextActions.nextTreatment.noteTreatment
                  : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Collapse>
    </Box>
  );
}
