import { Box, Typography, Modal, Fade, Button } from "@mui/material";

export default function DeleteGardenModal({
  confirmModal,
  setConfirmModal,
  deleteGarden,
}) {
  return (
    <Modal
      open={confirmModal}
      onClose={() => setConfirmModal(false)}
      closeAfterTransition
    >
      <Fade in={confirmModal}>
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Sei sicuro/a di voler eliminare il giardino?
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
            <Button variant="contained" color="primary" onClick={deleteGarden}>
              Conferma
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
