"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => {
    typeof window !== "undefined" && localStorage.removeItem("userToken");
    router.push("/log-in");
  };

  return (
    <div className="dash-board-main-wrapper">
      <div className="left-side-bar">
        <div className="overlay-mobile-area"></div>
        <div className="inner">
          <div className="single-menu-wrapper">
            <Link
              href="/dashboard"
              className={`single-menu openuptip ${
                pathname === "/dashboard" ? "active" : ""
              }`}
              flow="right"
              tooltip="Search"
            >
              <div className="icon">
                <img src="/dashboard/assets/images/icons/01.png" alt="icons" />
              </div>
              <p>Home</p>
            </Link>
            <Link
              href="/dashboard/useractions"
              className={`single-menu openuptip ${
                pathname === "/dashboard/useractions" ? "active" : ""
              }`}
              flow="right"
              tooltip="Search"
            >
              <div className="icon">
                <img src="/dashboard/assets/images/icons/02.png" alt="icons" />
              </div>
              <p>Add balance</p>
            </Link>
          </div>

          <div className="single-menu-wrapper">
            <button onClick={() => logout()} className="single-menu">
              <div className="icon">
                <img src="/dashboard/assets/images/icons/09.png" alt="icons" />
              </div>
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
