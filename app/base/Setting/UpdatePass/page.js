"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { ModeContext } from "../../layout";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import * as React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
export default function UpdatePass() {
  const [showlastPassword, setShowlastPassword] = React.useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = React.useState(false);
  const [shownewPassword, setShownewPassword] = React.useState(false);

  const handleClickShowlastPassword = () =>
    setShowlastPassword((show) => !show);
  const handleClickShownewPassword = () =>
    setShownewPassword((show) => !show);
  const handleClickShowconfirmPassword = () =>
    setShowconfirmPassword((show) => !show);

  const [email, setEmail] = useState("");
  const { mode } = useContext(ModeContext);
  const [lastPassword, setLastPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  return (
    <div className="p-2  flex flex-col items-center justify-center gap-7 h-1/2">
     <div className="w-full"> <Link
        href="/base/Setting"
        style={{ color: mode === "#121212" ? "white" : "black" }}
        className="hover:text-gray-500"
      >
        <ArrowBackOutlinedIcon />
      </Link></div>
      <h2
        className={`font-bold text-2xl ${mode === "white" ? " text-black" : " text-white"} `}
      >
        Change Password
      </h2>
              <input
          value={email}
          maxLength={80}
          minLength={5}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="example@gmail.com...."
          className="hover:bg-gray-200 p-2  m-2 bg-gray-100 border-0 
        "
        />

        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="filled"
          className="hover:bg-gray-200 p-2  m-2 bg-gray-100 border-0 
        "
        >
          <InputLabel htmlFor="last password">Last password</InputLabel>
          <FilledInput
            id="last-password"
            type={showlastPassword ? "text" : "password"}
            value={lastPassword}
            onChange={(e) => setLastPassword(e.target.value)}
            required
            inputProps={{ maxLength: 20, minLength: 8 }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showlastPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={handleClickShowlastPassword}
                  edge="end"
                >
                  {showlastPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="filled"
          className="hover:bg-gray-200 p-2  m-2 bg-gray-100 border-0 
        "
        >
          <InputLabel htmlFor="new-password">New password</InputLabel>
          <FilledInput
            id="new-password"
            type={shownewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            inputProps={{ maxLength: 20, minLength: 8 }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    shownewPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={handleClickShownewPassword}
                  edge="end"
                >
                  {shownewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="filled"
          className="hover:bg-gray-200 p-2  m-2 bg-gray-100 border-0 
        "
        >
          <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
          <FilledInput
            id="confirm-password"
            type={showconfirmPassword ? "text" : "password"}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            inputProps={{ maxLength: 20, minLength: 8 }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showconfirmPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={handleClickShowconfirmPassword}
                  edge="end"
                >
                  {showconfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <button
         
         
        onClick={async () => {
          if (newPassword !== confirmNewPassword) {
            alert("New password and confirm new password do not match");
            return;
          }
          try {
            const res = await fetch("https://chat-backend-5-gik3.onrender.com/updatePassword", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                lastPassword,
                newPassword,
                confirmNewPassword,
              }),
              credentials: "include",
            });
            const data = await res.json();
            alert(data.status);
          } catch (error) {
            console.error("error  ", error);
            
          }
        }}


          className="cursor-pointer mb-3  bg-gray-400 p-2 rounded-2xl font-bold text-black w-ful hover:bg-gray-700 duration-200 hover:text-white"
        >
          Update Password
        </button>
    </div>
  );
}
