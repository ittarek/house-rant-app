import * as React from "react";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
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
import Swal from "sweetalert2";
import axios from "axios";
import EditHouse from "./EditHouse";

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



function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
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
    label: "Availability Date",
  },
  {
    id: " rentPerMonth",
    numeric: true,
    disablePadding: false,
    label: "Rent Per Month",
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

const  AllHouse = () => {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
 const [data, setData] = React.useState([]);
// console.log(data);

 React.useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get("http://localhost:5000/getHouseData");
       setData(response.data);
     } catch (error) {
       console.error(error);
     }
   };

   fetchData();
 }, []); 

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (data.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? data.length
      : Math.min(data.length, (page + 1) * rowsPerPage);
  };
// handle delete
  const handleDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "are you sure Delete This House ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add !",
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/houseDelete/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            if (data.deletedCount) {
  
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Delete Successful",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };
const handleEdit = (id)=> {
 setOpen(prevOpen => (prevOpen === id ? null : id));
}
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
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
        {  <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            // size={dense ? "small" : "medium"}
          >
            <thead>
              <tr>
                {headCells.map(headCell => {
                  return (
                    <th key={headCell.id}>
                      <Link underline="none" color="neutral" fontWeight="lg">
                        {headCell.label}
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="w-full">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <tr className="w-full" key={row._id}>
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
                        <IconButton size="sm" color="danger" variant="solid" onClick={()=> handleDelete(row._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </td>
                      <td>
                        {" "}
                        {open === row._id && <EditHouse open={open} setOpen={setOpen} />}
                        <IconButton
                          size="sm"
                          color="success"
                          variant="solid"
                          onClick={() => handleEdit(row._id)}
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
                        from: data.length === 0 ? 0 : page * rowsPerPage + 1,
                        to: getLabelDisplayedRowsTo(),
                        count: data.length === -1 ? -1 : data.length,
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
                          data.length !== -1
                            ? page >= Math.ceil(data.length / rowsPerPage) - 1
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
          </Table>}
        </TableContainer>
      </Paper>
    </Box>

  );
}
export default AllHouse;
