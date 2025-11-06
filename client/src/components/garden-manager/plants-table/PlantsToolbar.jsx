import { deletePlants } from "./fetches/deletePlants";

import PlantModal from "./modals/PlantModal";
import MassiveModal from "./modals/MassiveModal";
import DeletePlantsModal from "./modals/DeletePlantsModal";

import FlowerButton from "./FlowerButton";

import { alpha } from "@mui/material/styles";

import { Box, Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import {
  FilterList as FilterListIcon,
  Add as AddIcon,
  LocalFlorist as PlantIcon,
} from "@mui/icons-material";

import { useGardenContext } from "@/structure/GardenProvider";
import { useState } from "react";

export default function PlantsToolbar({
  gardenId,
  selected,
  modalOpen,
  setModalOpen,
  isNewPlant,
  idEditPlant,
  refresh,
  openModal,
}) {
  const { setSnackbar } = useGardenContext();
  const [confirmModal, setConfirmModal] = useState(false);
  const [massiveModal, setMassiveModal] = useState(false);
  const [typeMassive, setTypeMassive] = useState("");

  const closeModal = () => {
    setModalOpen(false);
  };

  const openMassiveModal = (type) => {
    setTypeMassive(type);
    setMassiveModal(true);
    document.activeElement?.blur();
  };

  const destroyPlants = () => {
    deletePlants(gardenId, selected, setConfirmModal, refresh, setSnackbar);
  };

  return (
    <Toolbar
      sx={[
        {
          display: "flex",
          justifyContent: "space-between",
          px: { xs: 0.5 },
          width: "100%",
        },
        selected.length > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ m: 2, display: "flex", gap: 2 }}>
          <FlowerButton
            sx={{
              p: 1.5,
              height: 40,
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
            onClick={() => openModal(true, null)}
          >
            <AddIcon />
            Aggiungi pianta
            <PlantIcon />
          </FlowerButton>
          <PlantModal
            open={modalOpen}
            handleClose={closeModal}
            setSnackbar={setSnackbar}
            onSuccess={() => {
              refresh((prev) => !prev);
              closeModal();
            }}
            isNew={isNewPlant}
            idToEdit={idEditPlant}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: "right",
          }}
        >
          {selected.length > 0 ? (
            <Typography color="inherit" variant="subtitle1" component="div">
              {selected.length} piante selezionate
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle" component="div">
              Lista delle piante
            </Typography>
          )}
          {selected.length > 0 ? (
            <>
              <MassiveModal
                open={massiveModal}
                onClose={() => setMassiveModal(false)}
                type={typeMassive}
                selected={selected}
                gardenId={gardenId}
                setSnackbar={setSnackbar}
                refresh={refresh}
                closeAfterTransition
              />
              <Tooltip title="Concimatura">
                <IconButton
                  onClick={() => {
                    openMassiveModal("concimatura");
                  }}
                  sx={{ width: "60px", height: "60px" }}
                >
                  <img
                    src="/fertilizing.png"
                    alt="concimatura"
                    width={60}
                    height={60}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Potatura">
                <IconButton
                  onClick={() => {
                    openMassiveModal("potatura");
                  }}
                  sx={{ width: "60px", height: "60x" }}
                >
                  <img
                    src="/pruning.png"
                    alt="portatura"
                    width={50}
                    height={50}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Trattamenti">
                <IconButton
                  onClick={() => {
                    openMassiveModal("trattamento");
                  }}
                  sx={{ width: "60px", height: "60px" }}
                >
                  <img
                    src="/treatments.png"
                    alt="trattamenti"
                    width={50}
                    height={50}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Elimina">
                <IconButton
                  onClick={() => {
                    setConfirmModal(true);
                    document.activeElement?.blur();
                  }}
                  sx={{ width: "60px", height: "60px" }}
                >
                  <img
                    src="/trashcan.png"
                    alt="portatura"
                    width={45}
                    height={45}
                  />
                </IconButton>
              </Tooltip>
              <DeletePlantsModal
                destroyPlants={destroyPlants}
                selected={selected}
                confirmModal={confirmModal}
                setConfirmModal={setConfirmModal}
              />
            </>
          ) : (
            <Tooltip title="Opzioni">
              <IconButton>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Toolbar>
  );
}
