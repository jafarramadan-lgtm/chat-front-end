"use client";
import PrimarySearchAppBar from "./Setting/top";
import { useContext, useState, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { ModeContext } from "./layout";
import SendIcon from "@mui/icons-material/Send";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";

type Message = {
  msg: string;
  time: string;
  idtwo: string;
  idone: string;
  status: string;
};

export default function Basepage() {
  const { mode } = useContext(ModeContext);
  const [search, setsearch] = useState("");
  const [ssearch, setssearch] = useState(false);
  const [datasearch, setdatasearch] = useState([]);
  const [message, setmessag] = useState<Message[]>([]);
  const [boolmsg, setboolmsg] = useState(false);
  const [text, settext] = useState("");
  const [user2, setusertwo] = useState("");
  const [friendstatus, setfriendstatus] = useState("offline");
  const [lastseen, setlastseen] = useState("");
  const [userclick, setuserclick] = useState("");
  const endofmessageref = useRef<HTMLDivElement>(null);
  const ws = useRef<WebSocket | null>(null);
  const id = Cookies.get("id") || "";
  useEffect(() => {
    const information = async () => {
      try {
        const res = await fetch("https://chat-backend-5-gik3.onrender.com/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ search: search, Id: id }),
        });
        const data = await res.json();
        setdatasearch(data);
        setfriendstatus(data.status);
        console.log(data);
      } catch (error) {
        console.error("error  ", error);
      }
    };

    information();
  }, [search]);
  useEffect(() => {
    const beginchat = async () => {
      try {
        const res = await fetch("https://chat-backend-5-gik3.onrender.com/chatbegin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        });
        const data = await res.json();
        if (data.data && Array.isArray(data.data)) {
          setmessag((prev) => [...prev, ...data.data]);
          console.log(data, "mmm");
        }
      } catch (error) {
        console.error("error  ", error);
      }
    };

    beginchat();

    const socket = new WebSocket(`ws://chat-backend-5-gik3.onrender.com/ws?id=${id}`);
    ws.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
    ws.current.onmessage = (e) => {
      const newmessage = JSON.parse(e.data);
   
      setmessag((p) => [...p, newmessage]);
    };
    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    if (endofmessageref.current) {
      endofmessageref.current.scrollIntoView();
    }
    console.log(message);
  }, [message]);
  const sendmessage = () => {
    if (!text.trim()) return;
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          idone: id,
          msg: text,
          idtwo: user2,
          time: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`,
        }),
      );
      settext("");
    }
  };

  return (
    <div
      className="w-full   h-full  flex flex-col  "
      style={{
        background: mode === "white" ? "white" : "rgba(0, 0, 0, 0.547)",
      }}
    >
      <PrimarySearchAppBar
        search={search}
        setsearch={setsearch}
        ssearch={ssearch}
        setssearch={setssearch}
      />
      <div className="flex w-full h-11/12   ">
        <div
          className=" p-4  no-scrollbar overflow-y-auto   w-6/12 h-full flex flex-col gap-2"
          style={{ background: mode === "white" ? "gray" : "#121212" }}
        >
          {Array.isArray(datasearch) &&
            datasearch.map((e: any) => (
              <div
                onClick={() => {
                  console.log(e);
                  setboolmsg(true);
                  setusertwo(e.id);
                  setuserclick(e.id);
                  console.log(e);
                }}
                key={uuidv4()}
                style={{}}
                className={`bg-${mode === "white" ? "gray-200" : "white"} text-black font-bold cursor-pointer hover:bg-gray-600 p-3 flex rounded-2xl justify-between `}
              >
                <Avatar
                  alt={e.name || "User"}
                  src={e?.url || null}
                  sx={{ background: "green" }}
                >
                  {(e.name as string)?.trim().charAt(0).toUpperCase() || "U"}
                </Avatar>

                <p> {e.name}</p>
                {e.status === "online" ? (
                  <div className="w-5 h-5 rounded-full bg-green-500"></div>
                ) : (
                  <small className="font-bold italic text-blue-400">
                    <sub>آخر ظهور</sub>
                    <sup>{e.curr}</sup>
                  </small>
                )}
              </div>
            ))}
        </div>
        {boolmsg ? (
          <div className=" w-full  " style={{ height: "90%" }}>
            <div className=" w-full flex-col  no-scrollbar overflow-y-auto mb-1 bg-slate-700  gap-4 p-2 h-full ">
              {message
                .filter(
                  (msg) =>
                    (String(msg.idone) === String(id) &&
                      String(msg.idtwo) === String(userclick)) ||
                    (String(msg.idone) === String(userclick) &&
                      String(msg.idtwo) === String(id)),
                )
                .map((msg, index) => (
                  <div
                    key={index}
                    className={` w-full flex p-2  h-fit m-2  justify-${id == String(msg.idone) ? "start" : "end"}   `}
                    ref={endofmessageref}
                  >
                    {" "}
                    <div className="bg-gray-300  items-end m-1 w-fit p-2 text-2xl  justify-items-end font-bold rounded-2xl">
                      <p>{msg.msg}</p>{" "}
                      <sub>
                        <small style={{ direction: "rtl" }}>{msg.time}</small>
                      </sub>
                    </div>
                  </div>
                ))}
            </div>
            <form
              onSubmit={async (e: React.FormEvent) => {
                sendmessage();

                e.preventDefault();
              }}
            >
              <input
                type="text"
                value={text}
                onChange={(e) => settext(e.target.value)}
                className="w-10/12 bg-yellow-200   p-5 mx-3 border-2 rounded-2xl"
                placeholder="Enter The Message......."
              ></input>
              <SendIcon
                type="submit"
                onClick={sendmessage}
                className={`rounded-2xl text-${mode == "white" ? "black" : "white"} hover:text-gray-500 cursor-pointer `}
                sx={{ fontSize: 40 }}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
