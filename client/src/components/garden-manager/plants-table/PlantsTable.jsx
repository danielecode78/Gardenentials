import { getComparator } from "./utils/sorting";
import { useSortHandler } from "./utils/useSortHandler";

import PlantsToolbar from "./PlantsToolbar";
import PlantsHead from "./PlantsHead";
import PlantsBody from "./PlantsBody";

import {
  Box,
  Table,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
import { useState, useMemo } from "react";

export default function PlantsTable({ garden, refresh }) {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewPlant, setIsNewPlant] = useState(true);
  const [idEditPlant, setIdEditPlant] = useState(null);

  const { createSortHandler } = useSortHandler(
    order,
    orderBy,
    setOrder,
    setOrderBy
  );

  const openModal = (switchPlant, idPlant) => {
    setIdEditPlant(idPlant);
    setIsNewPlant(switchPlant);
    setModalOpen(true);
    document.activeElement?.blur();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - garden?.myPlants?.length)
      : 0;

  const visibleRows = useMemo(
    () =>
      [...(garden.myPlants || [])]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, garden.myPlants]
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper sx={{ mb: 2 }}>
        <PlantsToolbar
          gardenId={garden._id}
          selected={selected}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isNewPlant={isNewPlant}
          idEditPlant={idEditPlant}
          refresh={refresh}
          openModal={openModal}
        />

        <TableContainer>
          <Table
            sx={{ tableLayout: "auto" }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <PlantsHead
              orderBy={orderBy}
              order={order}
              createSortHandler={createSortHandler}
              garden={garden}
              selected={selected}
              setSelected={setSelected}
            />

            <PlantsBody
              garden={garden}
              emptyRows={emptyRows}
              visibleRows={visibleRows}
              selected={selected}
              setSelected={setSelected}
              refresh={refresh}
              openModal={openModal}
            />
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={garden?.myPlants?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
