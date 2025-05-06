"use client";
import Footer from "@/components/UserDashboardElements/Footer";
import Navbar from "@/components/UserDashboardElements/Navbar";
import Sidebar from "@/components/UserDashboardElements/Sidebar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    let token =
      typeof window !== "undefined" && localStorage.getItem("userToken");
    if (!token) {
      setisAuthenticated(false);
      redirect("/log-in");
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
      <Footer />
    </>
  );
}
