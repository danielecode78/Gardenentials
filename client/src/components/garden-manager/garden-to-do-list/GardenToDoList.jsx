import {
  funcToDo,
  deleteToDoActions,
} from "@/components/garden-manager/utils/actionsManager";
import PopoverToDoDelete from "@/components/garden-manager/garden-to-do-list/PopoverToDoDelete";

import {
  Box,
  Typography,
  IconButton,
  Paper,
  Tooltip,
  List,
  ListItemButton,
  Collapse,
} from "@mui/material";
import {
  Clear as ClearIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import { useState, useMemo, Fragment } from "react";
import { useGardenContext } from "@/structure/GardenProvider";
import { useTheme } from "@mui/material/styles";

export default function GardenToDoList({ garden, refresh, id }) {
  const { setSnackbar } = useGardenContext();
  const theme = useTheme();

  const [toDoDetails, setToDoDetails] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [toDoToDelete, setToDoToDelete] = useState(null);

  const newArrayToDo = useMemo(() => {
    return funcToDo(garden);
  }, [garden.myPlants]);

  const deleteActions = () => {
    deleteToDoActions(toDoToDelete, id, setSnackbar, refresh);
  };

  return (
    <Paper
      sx={{
        height: "100%",
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
          <Tooltip title="Cose da fare">
            <Box
              component="img"
              src="/works.png"
              sx={{ height: 50, width: 50 }}
            />
          </Tooltip>
          <Typography variant="h5">Cose da fare</Typography>
        </Box>
        <Box>
          <List>
            {newArrayToDo?.length > 0 ? (
              newArrayToDo.map((el, index) => {
                const itemKey = `${el.dateEvent.getTime()}-${el.type}`;

                return (
                  <Fragment key={itemKey}>
                    <Box sx={{ display: "flex" }}>
                      <ListItemButton
                        sx={{ pl: 0, display: "flex", gap: 1 }}
                        onClick={() => {
                          setToDoDetails((prev) => ({
                            ...prev,
                            [itemKey]: !prev[itemKey],
                          }));
                        }}
                      >
                        {toDoDetails[itemKey] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            color:
                              new Date().setHours(0, 0, 0, 0) >
                              new Date(el.dateEvent).setHours(0, 0, 0, 0)
                                ? theme.palette.terracotta.main
                                : null,
                          }}
                        >
                          <Typography>
                            {new Date(el.dateEvent).toLocaleDateString("it-IT")}
                          </Typography>
                          <Typography>{el.type}</Typography>
                        </Box>
                      </ListItemButton>

                      <Tooltip title="Elimina">
                        <IconButton
                          onClick={(event) => {
                            setAnchorEl(event.currentTarget);
                            setToDoToDelete(el);
                          }}
                        >
                          <ClearIcon
                            sx={{
                              color:
                                new Date().setHours(0, 0, 0, 0) >
                                new Date(el.dateEvent).setHours(0, 0, 0, 0)
                                  ? theme.palette.terracotta.main
                                  : null,
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Collapse
                      in={toDoDetails[itemKey]}
                      timeout={300}
                      unmountOnExit
                    >
                      {el.plants?.length > 0 &&
                        el.plants.map((plant, idx) => (
                          <Box
                            key={`${plant.idPlant}-${idx}`}
                            component="fieldset"
                            sx={{
                              borderRadius: 1,
                              border: "1px dashed #bfbfbfff",
                            }}
                          >
                            <legend style={{ fontWeight: "600" }}>
                              {plant.name}
                            </legend>
                            <Typography
                              sx={{
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                              }}
                            >
                              {plant.note}
                            </Typography>
                          </Box>
                        ))}
                    </Collapse>
                  </Fragment>
                );
              })
            ) : (
              <Typography variant="body" sx={{ opacity: 0.4 }}>
                Nessun elemento presente.
              </Typography>
            )}
          </List>
        </Box>
      </Box>
      <PopoverToDoDelete
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setToDoToDelete={setToDoToDelete}
        deleteActions={deleteActions}
      />
    </Paper>
  );
}
