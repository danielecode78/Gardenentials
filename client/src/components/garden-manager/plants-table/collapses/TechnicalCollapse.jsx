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

export default function TechnicalCollapse({ rowId, plant }) {
  const [openTechnical, setOpenTechnical] = useState({});

  return (
    <Box sx={{ margin: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Scheda tecnica
        </Typography>
        <Tooltip
          title={
            openTechnical[rowId]
              ? "Nascondi operazioni da effettuare"
              : "Mostra operazioni da effettuare"
          }
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpenTechnical((prev) => ({
                ...prev,
                [rowId]: !prev[rowId],
              }));
            }}
          >
            {openTechnical[rowId] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={openTechnical[rowId]} timeout={300} unmountOnExit>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head" sx={{ width: "25%" }}>
                Nome comune
              </TableCell>
              <TableCell colSpan={3} sx={{ width: "75%" }}>
                {plant?.commonName
                  ? plant?.commonName
                  : "Nessuna descrizione disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" sx={{ width: "25%" }}>
                Nome scientifico
              </TableCell>
              <TableCell colSpan={3} sx={{ width: "75%" }}>
                {plant?.scientificName
                  ? plant?.scientificName
                  : "Nessuna descrizione disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" sx={{ width: "25%" }}>
                Varietà comune
              </TableCell>
              <TableCell colSpan={3} sx={{ width: "75%" }}>
                {plant?.commonNameVariety
                  ? plant?.commonNameVariety
                  : "Nessuna descrizione disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" sx={{ width: "25%" }}>
                Varietà scientifica
              </TableCell>
              <TableCell colSpan={3} sx={{ width: "75%" }}>
                {plant?.scientificVariety
                  ? plant?.scientificVariety
                  : "Nessuna descrizione disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" sx={{ width: "25%" }}>
                Descrizione
              </TableCell>
              <TableCell colSpan={3} sx={{ width: "75%" }}>
                {plant?.plantDescription
                  ? plant?.plantDescription
                  : "Nessuna descrizione disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Esposizione</TableCell>
              <TableCell colSpan={3}>
                {plant?.sunExposure ? plant?.sunExposure : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Terreno adatto</TableCell>
              <TableCell colSpan={3}>
                {plant?.recommendedSoil
                  ? plant?.recommendedSoil
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Tasso di crescita</TableCell>
              <TableCell colSpan={3}>
                {plant?.annualGrowthRate
                  ? plant?.annualGrowthRate
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Grandezza massima</TableCell>
              <TableCell colSpan={3}>
                {plant?.maximumSize ? plant?.maximumSize : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Mesi di potatura</TableCell>
              <TableCell colSpan={3}>
                {plant?.pruningMonths
                  ? plant?.pruningMonths
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Tipo di potatura</TableCell>
              <TableCell colSpan={3}>
                {plant?.recommendedPruningType
                  ? plant?.recommendedPruningType
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Fertilizzante</TableCell>
              <TableCell colSpan={3}>
                {plant?.recommendedFertilizerType
                  ? plant?.recommendedFertilizerType
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Irrigazione</TableCell>
              <TableCell colSpan={3}>
                {plant?.irrigationType
                  ? plant?.irrigationType
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Periodo fioritura</TableCell>
              <TableCell colSpan={3}>
                {plant?.floweringPeriod
                  ? plant?.floweringPeriod
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Utilizzo</TableCell>
              <TableCell colSpan={3}>
                {plant?.usage ? plant?.usage : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Tossicità</TableCell>
              <TableCell colSpan={3}>
                {plant?.toxicity ? plant?.toxicity : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Contenimento</TableCell>
              <TableCell colSpan={3}>
                {plant?.containmentNeeds
                  ? plant?.containmentNeeds
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Esigenze stagionali</TableCell>
              <TableCell colSpan={3}>
                {plant?.seasonalRequirements
                  ? plant?.seasonalRequirements
                  : "Non disponibile"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Collapse>
    </Box>
  );
}
