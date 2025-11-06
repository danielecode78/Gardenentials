import DiaryCollapse from "./collapses/DiaryCollapse";
import ImagesCollapse from "./collapses/ImagesCollapse";
import TechnicalCollapse from "./collapses/TechnicalCollapse";
import HistoryCollapse from "./collapses/HistoryCollapse";
import OperationsCollapse from "./collapses/OperationsCollapse";
import NotesCollapse from "./collapses/NotesCollapse";

import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Checkbox,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { Fragment, useState, useEffect } from "react";

export default function PlantsBody({
  garden,
  emptyRows,
  visibleRows,
  selected,
  setSelected,
  refresh,
  openModal,
}) {
  const [open, setOpen] = useState({});
  const [switchDiary, setSwitchDiary] = useState(false);

  useEffect(() => {
    setSwitchDiary((prev) => !prev);
  }, [garden]);

  const handleClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  return (
    <TableBody>
      {garden.myPlants?.length < 1 && (
        <TableRow>
          <TableCell colSpan={7}>
            <Typography variant="h6" textAlign="center" sx={{ opacity: 0.3 }}>
              Nessuna pianta è stata ancora inserita.
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {garden.myPlants &&
        visibleRows.map((row, index) => {
          const isItemSelected = selected.includes(row._id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <Fragment key={`fragment-${row._id}`}>
              <TableRow
                hover={row.plant ? true : false}
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
                sx={{ cursor: row.plant ? "pointer" : null }}
                onClick={() => console.log("click")}
              >
                <TableCell sx={{ width: "40px", pl: 1, pr: 0 }}>
                  <Tooltip title="Modifica pianta">
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(false, row._id);
                      }}
                      sx={{ width: "40px", height: "40px" }}
                    >
                      <img
                        src="/edit-plant.png"
                        alt="modifica pianta"
                        width={40}
                        height={40}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ width: "40px", px: 1 }}>
                  <Tooltip
                    title={
                      open[row._id]
                        ? "Nascondi informazioni"
                        : "Mostra informazioni"
                    }
                  >
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen((prev) => ({
                          ...prev,
                          [row._id]: !prev[row._id],
                        }));
                      }}
                    >
                      {open[row._id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                  align="left"
                  sx={{
                    maxWidth: 300,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.healthStatus}</TableCell>
                <TableCell align="left">{row.lightExposure}</TableCell>
                <TableCell align="left">
                  {row.history.plantedAt ? (
                    new Date(row.history.plantedAt).toLocaleDateString("it-IT")
                  ) : (
                    <Typography variant="body1">Data sconosciuta</Typography>
                  )}
                </TableCell>
                <TableCell padding="checkbox">
                  <Tooltip title="Seleziona pianta">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(event) => {
                        handleClick(event, row._id);
                      }}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={7}
                >
                  <Collapse in={open[row._id]} timeout={300} unmountOnExit>
                    <DiaryCollapse
                      rowId={row._id}
                      gardenId={garden._id}
                      rowDiary={row.diary}
                      setOpen={setOpen}
                      switchDiary={switchDiary}
                      refresh={refresh}
                    />
                    <ImagesCollapse
                      rowId={row._id}
                      plantImages={row.plant?.images}
                    />
                    <TechnicalCollapse rowId={row._id} plant={row.plant} />
                    <HistoryCollapse
                      rowId={row._id}
                      history={row.history}
                      soilPh={row.soilPh}
                    />
                    <OperationsCollapse
                      rowId={row._id}
                      nextActions={row.nextActions}
                    />
                    <NotesCollapse rowId={row._id} notes={row.notes} />
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          );
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={7} />
        </TableRow>
      )}
    </TableBody>
  );
}
