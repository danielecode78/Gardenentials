import { dataFixed } from "@/utils/dataFixed";

import { createEditMyPlant } from "../fetches/createEditMyPlant";

import TreatmentsApplied from "./PlantModalParts/TreatmentsApplied";
import OperationsToDo from "./PlantModalParts/OperationsToDo";
import GeneralInformation from "./PlantModalParts/GeneralInformation";

import { Box, Button, Modal, Fade, Backdrop, Grid } from "@mui/material";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function PlantModal({
  open,
  handleClose,
  setSnackbar,
  isNew,
  onSuccess,
  idToEdit,
}) {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm();

  const [idPlant, setIdPlant] = useState(null);

  const handleCloseAndReset = () => {
    if (isNew) {
      reset();
    }
    onSuccess();
    handleClose();
  };

  const onSubmit = async (data) => {
    const newData = dataFixed(data);
    await createEditMyPlant(
      { field: "myPlants", value: newData },
      idPlant,
      setSnackbar,
      isNew,
      id,
      idToEdit
    );
    setIdPlant(null);
    handleCloseAndReset();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseAndReset}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90vw",
            maxWidth: 1000,
            maxHeight: "100vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Grid container spacing={1}>
            <GeneralInformation
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              control={control}
              reset={reset}
              id={id}
              setIdPlant={setIdPlant}
              isNew={isNew}
              idToEdit={idToEdit}
              setSnackbar={setSnackbar}
            />
            <Grid size={{ xs: 12, md: 6 }}>
              <OperationsToDo
                register={register}
                control={control}
                errors={errors}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TreatmentsApplied
                setValue={setValue}
                getValues={getValues}
                watch={watch}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!idPlant}
          >
            Invia
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
