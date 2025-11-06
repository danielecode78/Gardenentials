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

export default function NotesCollapse({ rowId, notes }) {
  const [openNotes, setOpenNotes] = useState({});

  return (
    <Box sx={{ margin: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Annotazioni
        </Typography>
        <Tooltip
          title={
            openNotes[rowId] ? "Nascondi annotazioni" : "Mostra annotazioni"
          }
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpenNotes((prev) => ({
                ...prev,
                [rowId]: !prev[rowId],
              }));
            }}
          >
            {openNotes[rowId] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={openNotes[rowId]} timeout={300} unmountOnExit>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell
                sx={{
                  maxWidth: 600,
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {notes ? notes : "Nessuna annotazione presente"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Collapse>
    </Box>
  );
}
