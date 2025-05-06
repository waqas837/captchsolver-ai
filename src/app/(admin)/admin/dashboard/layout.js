"use client";
import Footer from "@/components/AdminElements/Footer";
import Navbar from "@/components/AdminElements/Navbar";
import Sidebar from "@/components/AdminElements/Sidebar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    let token =
      typeof window !== "undefined" && localStorage.getItem("adminToken");
    if (!token) {
      setisAuthenticated(false);
      redirect("/admin/login");
    } else {
      setisAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <p style={{ color: "black" }}>
        Unauthorized access is strict! Redirecting...
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
}
