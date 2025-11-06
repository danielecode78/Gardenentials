import { waterClick } from "@/components/garden-manager/utils/waterClick";
import { destroyGarden } from "@/components/garden-manager/fetches/destroyGarden";

import RainOverlay from "@/components/garden-manager/garden-header/RainOverlay";
import DeleteGardenModal from "@/components/garden-manager/garden-header/DeleteGardenModal";
import GardenModal from "@/components/centralized/GardenModal";

import { Box, Typography, IconButton, Paper, Tooltip } from "@mui/material";

import { useState, useRef } from "react";
import { useGardenContext } from "@/structure/GardenProvider";
import { useNavigate } from "react-router-dom";

export default function GardenHeader({ garden, id, refresh }) {
  const waterDiv = useRef(null);
  const [isRaining, setIsRaining] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const navigate = useNavigate();
  const { setSnackbar } = useGardenContext();

  const openModal = () => {
    setModalOpen(true);
    document.activeElement?.blur();
  };

  const closeModal = () => {
    setModalOpen(false);
    refresh();
  };

  const deleteGarden = () => {
    destroyGarden(id, setSnackbar, navigate);
  };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <Box
        ref={waterDiv}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isRaining && <RainOverlay />}
        <Box sx={{ m: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              mb: 1.5,
            }}
          >
            <Typography variant="h4">{garden.name}</Typography>

            <Typography variant="body">{garden.location?.address}</Typography>
            <Typography variant="body">
              Tipo di terreno: {garden.soilType}
            </Typography>
            <Typography variant="body1">
              Ultima irrigazione: {""}
              {garden.lastWatered
                ? new Date(garden.lastWatered).toLocaleString("it-IT")
                : "  --/--/----"}
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Registra ultima irrigazione">
              <IconButton
                onClick={() => waterClick(waterDiv, setIsRaining, id, refresh)}
                sx={{ width: "60px", height: "60px" }}
              >
                <img
                  src="/watered.png"
                  alt="irrigazione"
                  width={48}
                  height={48}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Modifica giardino">
              <IconButton
                onClick={openModal}
                sx={{ width: "60px", height: "60px" }}
              >
                <img
                  src="/edit-garden.png"
                  alt="modifica"
                  width={60}
                  height={60}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Elimina giardino">
              <IconButton
                onClick={() => {
                  setConfirmModal(true);
                  document.activeElement?.blur();
                }}
                sx={{ width: "60px", height: "60px" }}
              >
                <img
                  src="/delete-garden.png"
                  alt="elimina giardino"
                  width={53}
                  height={53}
                />
              </IconButton>
            </Tooltip>
            <DeleteGardenModal
              confirmModal={confirmModal}
              setConfirmModal={setConfirmModal}
              deleteGarden={deleteGarden}
            />
            <GardenModal
              open={modalOpen}
              handleClose={closeModal}
              isNew={false}
              gardenId={id}
              gardenName={garden.name}
              gardenLocation={garden.location}
              gardenSoilType={garden.soilType}
              gardenArray={garden.images}
            />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
