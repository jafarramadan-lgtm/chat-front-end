"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState, useEffect, useContext } from "react";
import { ModeContext } from "../layout";
import { Avatar } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditIcon from '@mui/icons-material/Edit';
export default function ProfilePage() {
  const [userinfo, setuserinfo] = useState({ name: "", email: "" });
  const [load, setloadi] = useState(false);
  const { mode}: any = useContext(ModeContext);

  useEffect(() => {
    const email = Cookies.get("email") || "";
    const name = Cookies.get("username") || "";

    setloadi(true);
    setuserinfo({ name, email });
  }, []);
  let email = Cookies.get("email");
  let name = Cookies.get("username") || "";
  const url = Cookies.get("profile") || "";
  if (!load) return null;
  return (
    <div className="h-2/3  p-7 flex rounded-3xl flex-col  gap-5 justify-center items-center ">
     <div className="w-full"> <Link
        href="/base"
        style={{ color: mode === "#121212" ? "white" : "black", }}
        className="hover:text-gray-500"
      >
<ArrowBackOutlinedIcon/>

      </Link></div>
      <Avatar
        alt={name || "User"}
        src={url}
        className="mb-0 border-4 border-blue-400"
        sx={{ background: "green", width: "100px", height: "100px" }}
      >
        {name.charAt(0).toUpperCase() || "U"}
      </Avatar>

      <p className="bg-gray-700 p-3 items-center flex w-full justify-center gap-3.5 rounded-2xl  text-white   ">
        User Name : {userinfo.name}
           <Link
          href={"/base/Profile/updatename"}
          className="cursor-pointer  p-2  font-bold bg-blue-400 rounded-full  text-white w-fit hover:text-black duration-200 "
        >
         <EditIcon/>
        </Link>
      </p>
      <p className="bg-gray-700 p-3 flex w-full justify-center gap-3.5 rounded-2xl  text-white   ">
        Email : {userinfo.email}
      </p>

      <div className="flex justify-around">
     
      </div>
    </div>
  );
}
