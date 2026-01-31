"use client";
import { useContext, useState } from "react";
import { ModeContext } from "../../layout";
import Link from "next/link";
import Cookies from "js-cookie";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";



export default function Updatname() {
  const { mode } = useContext(ModeContext);
  const [newname, setnewname] = useState("");
  const email = Cookies.get("email");
  
  return (
    <div
      style={{ background: mode }}
      className="h-2/3  p-7 flex rounded-3xl flex-col  gap-5 justify-center items-center "
    >
     <div className="w-full"> <Link
        href="./"
        style={{ color: mode === "#121212" ? "white" : "black"}}
        className="hover:text-gray-500"
      >
        <ArrowBackOutlinedIcon />
      </Link></div>
      <form
       
        className="h-2/3  p-7 flex rounded-3xl flex-col  gap-5 justify-center items-center "
      >
        <input
          type="text"
          value={newname}
          maxLength={50}
          minLength={5}
          required
          name="username"
          onChange={(e) => {
            setnewname(e.target.value);
          }}
          placeholder="New User Name..."
          className="bg-gray-700 p-3 flex w-full justify-between gap-3.5 rounded-2xl hover:bg-gray-500 text-white duration-200  "
        ></input>
        <button
onClick={async ()=> {
if(newname.length>=5){
            try {
            const res = await fetch("http://127.0.0.1:8000/updatename", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                newname,
              }),
              credentials: "include",
            });
            const data = await res.json();
            alert(data.status);
               
            Cookies.set("username", newname);
            setnewname("");
          } catch (error) {
            console.error("error  ", error);
          }
}
}
      
      }
          type="submit"
          className="cursor-pointer mb-3  bg-gray-200 p-2 rounded-2xl font-bold text-black w-fit hover:bg-gray-700 duration-200 hover:text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
}
