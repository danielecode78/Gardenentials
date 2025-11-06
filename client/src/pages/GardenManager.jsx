import "@/components/garden-manager/styles/fill.css";
import "@/components/garden-manager/styles/rain.css";

import GardenHeader from "@/components/garden-manager/garden-header/GardenHeader";
import GardenNotes from "@/components/garden-manager/garden-notes/GardenNotes";
import GardenToDoList from "@/components/garden-manager/garden-to-do-list/GardenToDoList";

import { getGarden } from "@/components/garden-manager/fetches/getGarden";

import { Grid, Box, Typography, Paper, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";

import { useState, useEffect, useCallback } from "react";
import { useGardenContext } from "@/structure/GardenProvider";
import PlantsTable from "@/components/garden-manager/plants-table/PlantsTable";
import CarouselImages from "@/components/centralized/CarouselImages";

export default function GardenManager() {
  const [garden, setGarden] = useState({});

  const { setSnackbar } = useGardenContext();
  const [refreshSwitch, setRefreshSwitch] = useState(false);
  const { id } = useParams();

  const refresh = useCallback(() => {
    setRefreshSwitch((prev) => !prev);
  }, []);

  const imagesArray =
    garden?.images?.length > 0 ? garden.images.map((el) => el.url) : [];

  useEffect(() => {
    getGarden(setGarden, id, setSnackbar);
  }, [refreshSwitch, id]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid size={12} sx={{ pb: 1 }}>
            <GardenHeader garden={garden} id={id} refresh={refresh} />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <Paper
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Tooltip title="Immagini del giardino">
                  <Box
                    component="img"
                    src="/garden-pictures.png"
                    sx={{ height: 60, width: 60 }}
                  />
                </Tooltip>
                <Typography variant="h5">Immagini</Typography>
              </Box>
              <CarouselImages imagesArray={imagesArray} />
            </Paper>
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <GardenNotes garden={garden} id={id} refresh={refresh} />
          </Grid>
          <Grid size={12} sx={{ mb: 1 }}>
            <GardenToDoList garden={garden} refresh={refresh} id={id} />
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlantsTable
              key={refreshSwitch}
              garden={garden}
              refresh={setRefreshSwitch}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
