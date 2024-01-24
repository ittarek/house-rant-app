import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";
import toast from "react-hot-toast";

const Signup = () => {
  const { getUser } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  console.log(error);
  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/house-owner";
  const [formData, setFormData] = useState({
    fullName: "",
    role: "House Owner",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async event => {
  try {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const savedUser = {
      fullName: data.get("fullName"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role"),
    };


    const response = await axios.post(
      "https://house-rant-server-9bfiaau4r-ittarek.vercel.app/register",
      savedUser
    );
console.log(response.data);

    if (response.data.accessToken) {
      localStorage.setItem("access_token", response.data.accessToken);
      setError("");
      getUser();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } else if (response.data?.error) {
      setError(response.data?.error);
      console.error("Registration error:", response.data?.error);
    } else {
      // Handle the case where the server response is not as expected
      console.error("Unexpected server response:", response);
    }
  } catch (error) {
    console.error("Registration error:", error.response.data.error);
     setError(error.response.data.error);
    // Handle other errors (e.g., display an error message to the user)
  }
};


  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fullName"
                  id="fullName"
                  name="fullName"
                  required
                  fullWidth
                  label="Full Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  autoComplete="phoneNumber"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="text"
                  id="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  id="role"
                  name="role"
                  autoComplete="role"
                  onChange={handleChange}
                  required
                  value={formData.role}
                  className="w-full"
                >
                  <MenuItem value="House Owner">House Owner</MenuItem>
                  <MenuItem value="House Renter">House Renter</MenuItem>
                </Select>
              </Grid>
            </Grid>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account?{" "}
                <Link to="/login" variant="body2">
                  {" "}
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Signup;
