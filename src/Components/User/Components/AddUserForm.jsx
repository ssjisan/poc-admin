import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../DataProcessing/DataProcessing";
import { EyeOff, EyeOn } from "../../../assets/IconSet";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function AddUserForm() {
  const {
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    auth,
  } = useContext(DataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
        role,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("User Created!");
        navigate("/user_list");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Box sx={{ p: "24px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={7}>
          {auth?.user?.role === 0 ? (
            <Typography>
             Sorry, you can&apos;t create a new user. For further assistance, please contact the system administrator.
            </Typography>
          ) : (
            <Stack spacing={3}>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <TextField
                label="User Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  value={role}
                  label="role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={0}>Moderator</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? (
                          <EyeOff color="#918EAF" size="24px" />
                        ) : (
                          <EyeOn color="#918EAF" size="24px" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                disabled={auth?.user?.role === 0}
              >
                Create
              </Button>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
