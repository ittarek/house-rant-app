import { Box,TextField,} from "@mui/material";
import Button from "@mui/joy/Button";
import MyModal from "../../ui/MyModal";
import { Textarea } from "@mui/joy";
import axios from "axios";
import Swal from "sweetalert2";

const AddHouseModal = ({ open, setOpen }) => {
  const cancel = () => {
    setOpen(false);
  };
const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // {acknowledged: true, insertedId: '650c60412dd208edfe2bbd10'}

const houseData = {
  name: data.get("name"),
  address: data.get("address"),
  city: data.get("city"),
  bedrooms: data.get("bedroom"),
  bathrooms: data.get("bathRoom"),
  roomSize: data.get("roomSize"),
  picture: data.get("picture"),
  availabilityDate: data.get("availabilityDate"),
  rentPerMonth: data.get("rentPerMonth"),
  phoneNumber: data.get("phoneNumber"),
  description: data.get("description"),
};
try {
    // Make an API request to your backend to register the user
    const response = await axios.post(
      "https://house-rant-server-9bfiaau4r-ittarek.vercel.app/houseRant",
      houseData
    );

    console.log(response.data);
    if (response.data) {
      // reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "House Data Add successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
  
    }
 
  } catch (error) {
    console.error(error);
   
  }

    cancel();
  };

  return (
    <MyModal open={open} setOpen={setOpen} title="ADD Your House">
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        className="grid lg:grid-cols-3    gap-6 grid-cols-2 mx-auto "

      >
        {/* name */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        {/* address */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          type="text"
          id="address"
          autoComplete="address"
        />
        {/* city */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="city"
          label="City"
          type="text"
          id="city"
          autoComplete="city"
        />
        {/* bedroom */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="bedroom"
          label="Bedroom"
          type="number"
          id="bedroom"
          autoComplete="bedroom"
        />
        {/* bathRoom */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="bathRoom"
          label="Bath room"
          type="number"
          id="bathRoom"
          autoComplete="bathRoom"
        />
        {/* room size */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="roomSize"
          label="Room Size"
          type="text"
          id="roomSize"
          autoComplete="roomSize"
        />
        {/* picture */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="picture"
            label="Picture Link"
          // type="file"
          id="picture"
          autoComplete="picture"
        />
        {/* availabilityDate */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="availabilityDate"
          //   label="Availability Date"
          type="date"
          id="availabilityDate"
          autoComplete="availabilityDate"
        />
        {/* rentPerMonth */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="rentPerMonth"
          label="Rent Per Month"
          type="number"
          id="rentPerMonth"
          autoComplete="rentPerMonth"
        />
        {/* phoneNumber, */}
        <TextField
          margin="normal"
          required
          fullWidth
          name="phoneNumber"
          label="Phone Number"
          type="number"
          id="phoneNumber"
          autoComplete="phoneNumber"
        />
        {/* description */}
        <Textarea
          placeholder="Description"
          margin="normal"
          required
          fullWidth
          name="description"
          //   label="Phone Number"
          type="text"
          id="description"
          autoComplete="description"
        ></Textarea>
        <Box
          sx={{
            display: "flex",
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <Button
            type="button"
            variant="soft"
            onClick={() => cancel()}
            sx={{ mr: 5 }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="soft">
            Submit
          </Button>
        </Box>
      </Box>
    </MyModal>
  );
};

export default AddHouseModal;
