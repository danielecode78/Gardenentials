import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useState, useMemo, useEffect } from "react";
import LeafButton from "@/components/gardens-table/LeafButton";
import GardenModal from "@/components/centralized/GardenModal";
import { useGardenContext } from "@/structure/GardenProvider";
import { useNavigate } from "react-router-dom";
import { fetchGardens } from "@/components/gardens-table/fetches/fetchGardens";

import {
  getComparator,
  EnhancedTableHead,
} from "../components/gardens-table/GardensHead";

export default function Gardens() {
  const { setSnackbar } = useGardenContext();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const openModal = () => {
    setModalOpen(true);
    document.activeElement?.blur();
  };
  const closeModal = () => setModalOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGardens(setRows);
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  );

  const handleClick = (event, id) => {
    navigate(`/garden-manager/${id}`);
  };

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          pb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          I miei giardini
        </Typography>
        <LeafButton
          sx={{
            mt: 2,
            p: 1.5,
            height: 40,
          }}
          onClick={openModal}
        >
          <AddIcon />
          Aggiungi
          <AgricultureIcon sx={{ ml: 1 }} />
        </LeafButton>
        <GardenModal
          open={modalOpen}
          handleClose={closeModal}
          setSnackbar={setSnackbar}
          onSuccess={() => fetchGardens(setRows)}
          isNew={true}
        />
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }} elevation={5}>
        <TableContainer
          sx={{
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            sx={{
              width: "100%",
            }}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    tabIndex={-1}
                    key={row._id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ pl: 2 }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.myPlants.length}</TableCell>
                    <TableCell align="right">
                      {
                        row.myPlants.filter(
                          (plant) => plant.healthStatus === "Sana"
                        ).length
                      }
                    </TableCell>
                    <TableCell align="right">
                      {row.lastWatered &&
                        new Date(row.lastWatered).toLocaleString("it-IT")}
                    </TableCell>
                    <TableCell align="right">
                      {row.soilType && row.soilType}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
