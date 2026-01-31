"use client";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { ModeContext } from "../layout";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect, useContext } from "react";
import HttpsIcon from "@mui/icons-material/Https";
import { Avatar, IconButton, Box } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
export default function Setting() {
  const [Label, setLabel] = useState("Light Mode");
  const [image, setImage] = useState<File | null>(null);
  const [mounted, setmounted] = useState(false);
  useEffect(() => {
    setmounted(true);
  }, []);
  const email = Cookies.get("email") || "";
  const [url, seturl] = useState(Cookies.get("profile"));
  const name = Cookies.get("username") || "";
  const handleupload = async (fileFrominput?: File) => {
    const current = fileFrominput || image;

    if (!current) {
      alert("this is not image");
      return;
    }
    const formData = new FormData();
    formData.append("file", current);
    formData.append("email", email);
    try {
      const response = await fetch("https://chat-backend-5-gik3.onrender.com/uploadprofile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      Cookies.set("profile", data.image_url);

      alert("success upload image" + data.url);
      seturl(data.image_url);
    } catch (error) {
      console.log("error", error);
    }
  };
  const { mode, setmode }: any = useContext(ModeContext);
  const router = useRouter();
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff",
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
          ...theme.applyStyles("dark", {
            backgroundColor: "#8796A5",
          }),
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff",
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },

      "& .MuiSwitch-track": {
        ...theme.applyStyles("dark", {
          backgroundColor: "#003892",
        }),
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
      ...theme.applyStyles("dark", {
        backgroundColor: "#8796A5",
      }),
    },
  }));
  if (!mounted) return null;
  return (
    <div
      style={{ background: mode }}
      className="h-2/3  p-7 flex rounded-3xl flex-col  gap-5 justify-center items-center "
    >
      <div className="w-full">
        {" "}
        <Link
          href="/base"
          style={{ color: mode === "#121212" ? "white" : "black" }}
          className="hover:text-gray-500"
        >
          <ArrowBackOutlinedIcon />
        </Link>
      </div>
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <Avatar
          alt={name || "User"}
          src={url}
          className="mb-0 border-4 border-blue-400"
          sx={{ background: "green", width: "100px", height: "100px" }}
        >
          {name.charAt(0).toUpperCase() || "U"}
        </Avatar>
        <input
          type="file"
          className="bg-yellow-50  px-4 rounded-2xl cursor-pointer duration-300 hover:bg-amber-400"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const selectedFile = e.target.files[0];
              setImage(selectedFile);
              handleupload(selectedFile);
            }
          }}
          style={{ display: "none" }}
          accept="image/*"
          id="icone-buuton-file"
        />
        <label htmlFor="icone-buuton-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{
              position: "absolute",
              bottom: "0",
              right: "0",
              background: "white",
              "&:hover": { background: "#f0f0f0", boxShadow: "2" },
            }}
          >
            <AddAPhotoIcon />
          </IconButton>
        </label>
      </Box>
      <h2 style={{ color: mode === "#121212" ? "white" : "black" }}>{name}</h2>
      <div
        className="bg-gray-700 p-3 flex w-full justify-between gap-3.5 rounded-2xl hover:bg-gray-500 cursor-pointer text-white duration-200  "
        onClick={() => {
          router.replace("/base/Setting/UpdatePass");
        }}
      >
        <p> Change Password</p>

        <HttpsIcon className="hover:text-red-500" />
      </div>
      <div
        onClick={async () => {
          let delet = confirm("Are you sur Delete your Account ??");
          if (delet) {
            console.log("Deleting account for email:", email);

            (document.cookie =
              "username=;wxpries=Thu, 01 Jan 1970 00:00:00 UTC; path=/;") &&
              (document.cookie =
                "email=;wxpries=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
            router.replace("/regist");

            try {
              const res = await fetch("https://chat-backend-5-gik3.onrender.com/deleteAccount", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
              });
              const data = await res.json();

              if (data.status === "Account deleted successfully") {
                alert("Account deleted successfully");
              } else {
                alert("Delete failed: " + data.error);
              }
            } catch (error) {
              console.error("error  ", error);
            }
          } else {
            return null;
          }
        }}
        className="bg-gray-700 p-3 flex w-full justify-between gap-3.5 rounded-2xl hover:bg-gray-500 cursor-pointer text-white duration-200  "
      >
        <p>Delete Account</p>
        <DeleteOutlinedIcon className="hover:text-red-500" />
      </div>

      <Link
        href="/base/Setting"
        className="bg-gray-700 p-3 flex w-full justify-between gap-3.5 rounded-2xl hover:bg-gray-500 cursor-pointer text-white duration-200  "
        onClick={() => {
          let sur = confirm("Are you sure you want to log out?");
          sur
            ? (document.cookie =
                "username=;wxpries=Thu, 01 Jan 1970 00:00:00 UTC; path=/;") &&
              (document.cookie =
                "email=;wxpries=Thu, 01 Jan 1970 00:00:00 UTC; path=/;") &&
              (document.cookie =
                "profile=;wxpries=Thu, 01 Jan 1970 00:00:00 UTC; path=/;")
            : null;
        }}
      >
        <p>Log out</p>
        <LogoutOutlinedIcon className="hover:text-red-500" />
      </Link>
      <div className="bg-gray-700 p-3  flex w-full justify-around  rounded-2xl hover:bg-gray-500 cursor-pointer text-white duration-200  ">
        {" "}
        <FormControlLabel
          control={
            <MaterialUISwitch
              checked={mode === "#121212"}
              onChange={() => {
                setmode(mode === "white" ? "#121212" : "white");
                setLabel(Label === "Light Mode" ? "Dark Mode" : "Light Mode");
              }}
            />
          }
          label={Label}
          style={{ color: mode === "#121212" ? "black" : "white" }}
        />
      </div>
    </div>
  );
}
