"use client";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

export default function () {
  const [s, ss] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  useEffect(() => {
    const sendEmail = async () => {
      if (!email) return;

      const res = await fetch("http://127.0.0.1:8000/numberget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
        credentials: "include",
      });
      const data = await res.json();
    };
    sendEmail();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    ss(true);
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/nuumberpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, email, name }),
        credentials: "include",
      });

      const data = await res.json();
      ss(false);
      if (data.status === "Code is correct") {
        document.cookie = "username=" + name + "; path=/";
        document.cookie = "email=" + email + "; path=/";
        document.cookie = "id=" + data.id + "; path=/";

        document.cookie = "profile=" + data.Profile + "; path=/";
        router.replace("/base");
      } else {
        alert("Incorrect Code");
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
      <h2>Enter the Confirmation Code</h2>
      <input
        type="number"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
        min="00000"
        max="99999"
        placeholder="Confrimation Code....."
        className="bg-white rounded-2xl px-4 py-2"
      />
      <button
        type="submit"
        className="bg-green-800 text-white rounded-2xl hover:cursor-pointer hover:bg-green-300 duration-700 hover:text-black p-2 w-full"
      >
        {s ? <CircularProgress color="secondary" /> : "Submit"}
      </button>
    </form>
  );
}
