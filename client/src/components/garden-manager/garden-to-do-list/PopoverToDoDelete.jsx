import { useTheme } from "@mui/material/styles";

import { Box, Typography, IconButton, Tooltip, Popover } from "@mui/material";

import { Done as DoneIcon, Clear as ClearIcon } from "@mui/icons-material";

export default function PopoverToDoDelete({
  anchorEl,
  setAnchorEl,
  setToDoToDelete,
  deleteActions,
}) {
  const theme = useTheme();

  return (
    <Popover
      open={Boolean(anchorEl)}
      onClose={() => {
        setAnchorEl(null);
        setToDoToDelete(null);
      }}
      anchorEl={anchorEl}
      sx={{ ml: 3, mt: 3 }}
    >
      <Typography variant="h5" align="center" sx={{ p: 1 }}>
        Conferma l'eliminazione.
      </Typography>
      <Typography variant="body" align="center" sx={{ p: 1 }}>
        Le modifiche verranno applicate a tutte le piante collegate.
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          pb: 1,
        }}
      >
        <Tooltip title="Annulla">
          <IconButton
            onClick={() => {
              setAnchorEl(null);
              setToDoToDelete(null);
            }}
            sx={{ width: 50, height: 50 }}
          >
            <ClearIcon
              fontSize="large"
              sx={{
                color: theme.palette.terracotta.main,
              }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Conferma">
          <IconButton
            onClick={() => {
              deleteActions();
              setAnchorEl(null);
              setToDoToDelete(null);
            }}
            sx={{ width: 50, height: 50 }}
          >
            <DoneIcon fontSize="large" color="primary" />
          </IconButton>
        </Tooltip>
      </Box>
    </Popover>
  );
}
