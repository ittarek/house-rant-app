import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Tooltip from "@mui/joy/Tooltip";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AddHouseModal from "./AddHouseModal";
import { TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";

function createData(
  name,
  address,
  city,
  bedrooms,
  bathrooms,
  roomSize,
  picture,
  availabilityDate,
  rentPerMonth,
  phoneNumber,
  description
) {
  return {
    name,
    address,
    city,
    bedrooms,
    bathrooms,
    roomSize,
    picture,
    availabilityDate,
    rentPerMonth,
    phoneNumber,
    description,
  };
}

const rows = [
  createData(
    "Home",
    "kumira, Ctg, Bd",
    "Chittagong",
    4,
    4.3,
    12,
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "1/1/2024",
    5000,
    +8815428165,
    "sadkls aksdklas ksladjklas kasd "
  ),
  createData(
    "Home",
    "kumira, Ctg, Bd",
    "Chittagong",
    4,
    4.3,
    11,
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "   10 / 2 / 2024",
    5000,
    15428165,
    "sadkls aksdklas ksladjklas kasd "
  ),
  createData(
    "Home",
    "kumira, Ctg, Bd",
    "Chittagong",
    4,
    4.3,
    22,
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "10 / 2 / 2024",
    5000,
    15428165,
    "sadkls aksdklas ksladjklas kasd "
  ),
  createData(
    "Home",
    "kumira, Ctg, Bd",
    "Chittagong",
    4,
    4.3,
    41,
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "10 / 2 / 2024",
    5000,
    15428165,
    "sadkls aksdklas ksladjklas kasd "
  ),
  createData(
    "Home",
    "kumira, Ctg, Bd",
    "Chittagong",
    4,
    4.3,
    32,
    "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    " 10 / 2 / 2024",
    5000,
    15428165,
    "sadkls aksdklas ksladjklas kasd "
  ),
  createData(
    "Home",
    "kumira, Ctg, Bd",
    "Chittagong",
    4,
    4.3,
    44,
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "  10 / 2 / 2024",
    5000,
    15428165,
    "sadkls aksdklas ksladjklas kasd "
  ),
];

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    // disablePadding: true,
    label: "Name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "city",
    // numeric: false,
    // disablePadding: false,
    label: "City",
  },
  {
    id: "Bedroom",
    numeric: true,
    disablePadding: false,
    label: "Bedroom",
  },
  {
    id: "bathroom",
    numeric: true,
    disablePadding: false,
    label: "Bathroom",
  },
  {
    id: "roomSize",
    numeric: true,
    disablePadding: false,
    label: "RoomSize",
  },
  {
    id: "picture",
    numeric: false,
    disablePadding: false,
    label: "Picture",
  },
  {
    id: "availabilityDate",
    // numeric: true,
    // disablePadding: false,
    label: "Availability Date"
  },
  {
    id: " rentPerMonth",
    numeric: true,
    disablePadding: false,
    label: "Rent Per Month"
  },
  {
    id: " phoneNumber",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: " description",
    numeric: true,
    disablePadding: false,
    label: "Description",
  },
  {
    id: " delete",
   
    label: "Delete",
  },
  {
    id: "edit",

    label: "Edit",
  },
];

function EnhancedTableHead(props) {
  const {

    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
  
        {headCells.map(headCell => {
         
          return (
            <th
              key={headCell.id}
          
            >
        
              <Link underline="none" color="neutral" fontWeight="lg">
                {headCell.label}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default function AllHouse() {
          const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer >
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1,
              pl: { sm: 2 },
            }}
          >
            <Typography
              level="body-lg"
              sx={{ flex: "1 1 100%" }}
              id="tableTitle"
              component="div"
            >
              All House
            </Typography>
            <FilterListIcon />
          </Box>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead rowCount={rows.length} />
            <tbody className="w-full">
              {stableSort(rows, getComparator())
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <tr className="w-full" key={index}>
                      <td>{row.name}</td>
                      <td>{row.address}</td>
                      <td>{row.city}</td>
                      <td>{row.bedrooms}</td>
                      <td>{row.bathrooms}</td>
                      <td>{row.roomSize}</td>
                      <td>
                        <img src={row.picture} alt="Home" />
                      </td>
                      <td>{row.availabilityDate}</td>
                      <td>{row.rentPerMonth}</td>
                      <td>{row.phoneNumber}</td>
                      <td>{row.description}</td>
                      <td>
                        {" "}
                        <IconButton size="sm" color="danger" variant="solid">
                          <DeleteIcon />
                        </IconButton>
                      </td>
                      <td>
                        {" "}
                        <AddHouseModal open={open} setOpen={setOpen} />
                        <IconButton
                          size="sm"
                          color="success"
                          variant="solid"
                          onClick={() => setOpen(!open)}
                        >
                          <AppRegistrationIcon />
                        </IconButton>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            {/* for pagination */}
            <tfoot>
              <tr>
                <td colSpan={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      justifyContent: "flex-end",
                    }}
                  >
                    <FormControl orientation="horizontal" size="sm">
                      <FormLabel>Rows per page:</FormLabel>
                      <Select
                        onChange={handleChangeRowsPerPage}
                        value={rowsPerPage}
                      >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={25}>25</Option>
                      </Select>
                    </FormControl>
                    <Typography textAlign="center" sx={{ minWidth: 80 }}>
                      {labelDisplayedRows({
                        from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                        to: getLabelDisplayedRowsTo(),
                        count: rows.length === -1 ? -1 : rows.length,
                      })}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page === 0}
                        onClick={() => handleChangePage(page - 1)}
                        sx={{ bgcolor: "background.surface" }}
                      >
                        <KeyboardArrowLeftIcon />
                      </IconButton>
                      <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={
                          rows.length !== -1
                            ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                            : false
                        }
                        onClick={() => handleChangePage(page + 1)}
                        sx={{ bgcolor: "background.surface" }}
                      >
                        <KeyboardArrowRightIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </td>
              </tr>
            </tfoot>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
    // </Sheet>
  );
}
