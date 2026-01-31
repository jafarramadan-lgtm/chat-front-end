"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function LogPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://chat-backend-5-gik3.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.status === "Login successful") {
        router.replace(`/msg?email=${email}&name=${data.name}`);
      } else {
        alert("Login failed: " + data.name);
      }
    } catch (error) {
      console.error("error  ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex rounded-3xl w-fit h-fit p-6 flex-col gap-5 justify-around items-center bg-blue-200 "
    >
      <TextsmsOutlinedIcon className="text-blue-400 " fontSize="large" />
      <h1 className=" text-4xl h-fit font-bold text-black">Welcome Back</h1>

      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
        <TextField
          id="input-with-sx"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label="Email..."
          inputProps={{ maxLength: 50 ,minLength:5}}
          required
          variant="standard"
        />
      </Box>

      <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
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
      <button
        type="submit"
        className="bg-green-800 text-white rounded-2xl hover:cursor-pointer hover:bg-green-300 duration-700 hover:text-black p-2 w-full"
      >
        Log In
      </button>
      <a className="no-underline text-red-600 hover:cursor-pointer">
        Forget Password ?
      </a>
      <Link
        href="/regist"
        className="no-underline text-blue-600 hover:cursor-pointer"
      >
        Create Account
      </Link>
    </form>
  );
}
