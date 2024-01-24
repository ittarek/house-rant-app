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
import axios from "axios";
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


const handleSubmit = async event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  try {
    const response = await axios.post(
      "https://house-rant-server-9bfiaau4r-ittarek.vercel.app/login",
      {
        email: data.get("email"),
        password: data.get("password"),
      }
    );

    if (response.data?.accessToken) {
      setError("");
      localStorage.setItem("access_token", response.data?.accessToken);
      toast.success("Successfully logged in");
      getUser();
      navigate(from, { replace: true });
    } else if (response.data?.error) {
      setError(response.data?.error);
      console.error("Login error:", response.data?.error);
    }
  } catch (error) {
    console.error("Login error:", error);
    // Handle other errors (e.g., display an error message to the user)
  }
};


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
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
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