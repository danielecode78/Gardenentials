import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const headCells = [
  {
    id: "name",
    toRight: false,
    disablePadding: false,
    label: "Nome",
  },
  {
    id: "nrPlants",
    toRight: true,
    disablePadding: false,
    label: "Piante",
  },
  {
    id: "health",
    toRight: true,
    disablePadding: false,
    label: "Di cui sane",
  },
  {
    id: "lastWatered",
    toRight: true,
    disablePadding: false,
    label: "Ultima irrigazione",
  },
  {
    id: "soilType",
    toRight: true,
    disablePadding: false,
    label: "Terreno",
  },
];

function descendingComparator(a, b, orderBy) {
  let valA, valB;

  switch (orderBy) {
    case "nrPlants":
      valA = a.myPlants.length;
      valB = b.myPlants.length;
      break;
    case "soilType":
      valA = a.soilType.length;
      valB = b.soilType.length;
      break;
    case "health":
      valA = a.myPlants.filter((p) => p.healthStatus === "Sana").length;
      valB = b.myPlants.filter((p) => p.healthStatus === "Sana").length;
      break;
    default:
      valA = a[orderBy];
      valB = b[orderBy];
  }

  const dateA = new Date(valA);
  const dateB = new Date(valB);
  if (!isNaN(dateA) && !isNaN(dateB)) return dateB - dateA;

  if (valB < valA) return -1;
  if (valB > valA) return 1;
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, sx = {} } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const theme = useTheme();

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.toRight ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              pl: 2,
              fontWeight: 700,
              backgroundColor: theme.palette.intensePistachio.main,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
