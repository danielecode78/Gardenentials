import { Box, Typography, IconButton, Tooltip, Collapse } from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import { useState } from "react";

import CarouselImages from "@/components/centralized/CarouselImages";

export default function ImagesCollapse({ rowId, plantImages }) {
  const [openImages, setOpenImages] = useState({});
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
          Immagini da API
        </Typography>
        <Tooltip
          title={openImages[rowId] ? "Nascondi storico" : "Mostra storico"}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpenImages((prev) => ({
                ...prev,
                [rowId]: !prev[rowId],
              }));
            }}
          >
            {openImages[rowId] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={openImages[rowId]} timeout={300} unmountOnExit>
        <CarouselImages imagesArray={plantImages} />
      </Collapse>
    </Box>
  );
}
