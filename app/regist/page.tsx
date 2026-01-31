"use client";
import Link from "next/link";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () =>
    setConfirmShowPassword((show) => !show);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    } else {
      try {
        const res = await fetch("https://chat-backend-5-gik3.onrender.com/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, password, confirmPassword }),
        });
        const data = await res.json();

        if (data.message === "success register") {
          alert("Registration successful, redirecting to msg page...");
          router.replace(`/msg?email=${email}&name=${name}`);
        } else {
          alert(
            "Registration failed: " + (data.status || JSON.stringify(data)),
          );
        }
      } catch (error) {
        alert("Network or server error: " + error);
        console.error("error  ", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex rounded-3xl w-fit h-fit p-6 flex-col gap-5 justify-around items-center bg-blue-200 "
    >
      <TextsmsOutlinedIcon className="text-blue-400" fontSize="large" />
      <h1 className="text-2xl h-fit font-bold text-black">
        Create Your Account
      </h1>

      <TextField
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        inputProps={{ maxLength: 20 }}
      />

      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email..."
          inputProps={{ maxLength: 50, minLength: 5 }}
          required
          variant="standard"
        />
      </Box>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <FilledInput
          id="password-input"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          inputProps={{ maxLength: 20, minLength: 8 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
        <InputLabel htmlFor="confirm-password-input">
          Confirm Password
        </InputLabel>
        <FilledInput
          id="confirm-password-input"
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          inputProps={{ maxLength: 20, minLength: 8 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showConfirmPassword
                    ? "hide the password"
                    : "display the password"
                }
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <button
        type="submit"
        className="bg-green-800 text-white rounded-2xl hover:cursor-pointer hover:bg-green-300 duration-700 hover:text-black p-2 w-full"
      >
        Register
      </button>

      <Link
        href="./log"
        className="no-underline text-blue-600 hover:cursor-pointer"
      >
        Do ypu have an account ?
      </Link>
    </form>
  );
}
