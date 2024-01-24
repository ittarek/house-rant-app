import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   googleLogin,
//   signIn,
//   toggleLoading,
// } from "../../redux/fetures/task/userSlice";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";
import toast from "react-hot-toast";
// import { GoogleAuthProvider } from "firebase/auth";
// import auth from "../../firebase/firebase.config";

const Login = () => {

//   const dispatch = useDispatch();
//   const { isLoading } = useSelector(state => state.userSlice);
    const { getUser } = useContext(AuthContext);
const [error, setError] = useState() 
 const navigate = useNavigate();
 const location = useLocation();
 const from = location?.state?.from?.pathname || "/";
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");


  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
 fetch("http://localhost:5000/login", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify({
     email: data.get("email"),
     password: data.get("password"),
   }),
 })
   .then(res => res.json())
   .then(data => {
     if (data?.accessToken) {
       setError("");
       localStorage.setItem("access_token", data?.accessToken);
       toast.success("successfully loggedin");
       getUser();
       navigate(from, { replace: true });
     } else if (data?.error) {
       setError(data?.error);
     }
   });
  

  }

  return (
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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              Don,t have an account?{" "}
              <Link to="/signup" variant="body2">
                {" "}
                <span className="underline text-yellow-600"> Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>{" "}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, fontSize: 24 }}
        // onClick={handleGoogleLogin}
      >
        G
      </Button>
    </Container>
  );

    }
   export default Login;