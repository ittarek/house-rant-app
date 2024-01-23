import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FormControl,
  InputLabel,
  Input,

  Select,
  MenuItem,
} from "@mui/material";

import Swal from "sweetalert2";

const Signup = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
 const [formData, setFormData] = React.useState({
   fullName: "",
   role: "House Owner",
   phoneNumber: "",
   email: "",
   password: "",
 });

 const handleChange = e => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };

  // signUp Function
  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const savedUser = {
      fullName: data.get("fullName"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role")
    };
    console.log(savedUser);
    
    fetch("https://task-management-serber.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(savedUser),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          // reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(from, { replace: true });
        }
      });
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
                  className="w-full"
                >
                  <MenuItem value="House Owner">House Owner</MenuItem>
                  <MenuItem value="House Renter">House Renter</MenuItem>
                </Select>
              </Grid>
            </Grid>
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
