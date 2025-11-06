import { Container, Box, Snackbar, Alert } from "@mui/material";
import Drawer from "@/components/layout/Drawer";
import { useGardenContext } from "@/structure/GardenProvider";

export default function GardenLayout({ children }) {
  const { snackbar, setSnackbar } = useGardenContext();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Container maxWidth="false" sx={{ py: 2, px: 0 }}>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={2000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              severity={snackbar.severity}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>

          <Drawer>{children}</Drawer>
        </Container>
      </Box>
    </Box>
  );
}
