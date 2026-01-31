"use client";
import { createContext, useState } from "react";

export const ModeContext = createContext({
  mode: "white",
  setmode: (v: string) => {},
});

export default function BaseLayout({ children }: { children: React.ReactNode }) {
  const [mode, setmode] = useState("white");
  return (
    <ModeContext.Provider value={{ mode, setmode }} >
      <div  style={{ background: mode === "white" ? "white" : "#121212" ,height:"100%"}} className="flex rounded-2xl  w-screen justify-center items-center">
        {children}
      </div>
    </ModeContext.Provider>
  );
}
