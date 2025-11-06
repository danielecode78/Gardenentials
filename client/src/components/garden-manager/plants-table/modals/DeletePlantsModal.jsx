import { Box, Typography, Paper, Modal, Fade, Button } from "@mui/material";

export default function DeletePlantsModal({
  destroyPlants,
  selected,
  confirmModal,
  setConfirmModal,
}) {
  return (
    <Modal
      open={confirmModal}
      onClose={() => setConfirmModal(false)}
      closeAfterTransition
    >
      <Fade in={confirmModal}>
        <Paper
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {selected.length > 1
              ? `Sei sicuro/a di voler eliminare le ${selected.length}
                        piante selezionate?`
              : "Sei sicuro/a di voler eliminare la pianta selezionata?"}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Non sarà possibile recuperare i dati dopo la conferma.
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              color="terracotta"
              onClick={() => setConfirmModal(false)}
            >
              Annulla
            </Button>
            <Button variant="contained" color="sage" onClick={destroyPlants}>
              Conferma
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
}
