import { headCells } from "./utils/headCells";

import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Tooltip,
} from "@mui/material";

import { visuallyHidden } from "@mui/utils";

export default function PlantsHead({
  orderBy,
  order,
  createSortHandler,
  garden,
  selected,
  setSelected,
}) {
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = garden?.myPlants?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "intensePistachio.main",
          height: "60px",
        }}
      >
        <TableCell sx={{ width: "40px" }}></TableCell>
        <TableCell sx={{ width: "40px" }}></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignCell}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: 700,
              width:
                headCell.id === "name"
                  ? "30%"
                  : headCell.id === "health"
                    ? "20"
                    : headCell.id === "lightExposure"
                      ? "20%"
                      : headCell.id === "plantedAt"
                        ? "15%"
                        : "auto",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox">
          <Tooltip title="Seleziona tutte le piante">
            <Checkbox
              color="primary"
              indeterminate={
                garden?.myPlants?.length > 0 &&
                selected.length > 0 &&
                selected.length < garden.myPlants.length
              }
              checked={
                garden?.myPlants?.length > 0 &&
                selected.length === garden.myPlants.length
              }
              onChange={handleSelectAllClick}
              inputProps={{
                "aria-label": "select all plants",
              }}
            />
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
