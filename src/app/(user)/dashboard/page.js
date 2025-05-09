"use client";
import { CONFIG } from "@/lib/Config";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserDashboard = () => {
  const [apiKey, setApiKey] = useState("");
  const [balance, setBalance] = useState("$0.00");
  const [requestsRemaining, setRequestsRemaining] = useState(
    "1000 requests remaining"
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const apiEndpoint = `${CONFIG.backendUrl}/user/getuserinfo`;
      const userToken =
        typeof window !== "undefined" && localStorage.getItem("userToken");

      if (!userToken) return;

      try {
        const response = await fetch(apiEndpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = await response.json();

        if (data.result && data.result[0]) {
          const user = data.result[0];
          setApiKey(user.BalanceApiKey || "");
          setUsername(user.username || "User");
          typeof window !== "undefined" &&
            localStorage.setItem("username", user.username);

          setRequestsRemaining(`${user.externalBalance} requests remaining`);
          setBalance(
            user.externalBalance ? `$${user.externalBalance / 1000}` : "$0.00"
          );
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Extract numeric value from requestsRemaining for display
  const getRequestsNumber = () => {
    if (typeof requestsRemaining === "string") {
      const match = requestsRemaining.match(/\d+/);
      return match ? match[0] : "0";
    }
    return "0";
  };

  return (
    <>
      <div
        className="main-center-content-m-left"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          color: "white",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          API Dashboard
        </h1>

        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(13, 24, 36, 0.5)",
            padding: "20px",
            marginBottom: "15px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "12px",
              color: "white",
            }}
          >
            Your API Key
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              marginBottom: "5px",
            }}
          >
            <input
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              readOnly
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "#0D1824",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "6px",
                fontSize: "14px",
                height: "36px",
              }}
            />
            <span
              onClick={() => setShowApiKey(!showApiKey)}
              style={{
                position: "absolute",
                right: "10px",
                cursor: "pointer",
                fontSize: "16px",
                color: "white",
              }}
            >
              {showApiKey ? "👁️‍🗨️" : "👁️"}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "600px",
            gap: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(13, 24, 36, 0.5)",
              padding: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "white",
              }}
            >
              Your Balance
            </h2>

            <div
              style={{
                backgroundColor: "rgba(75, 222, 172, 0.2)",
                color: "#4BDEAC",
                padding: "6px 15px",
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              {balance}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: "8px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(13, 24, 36, 0.5)",
              padding: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "white",
              }}
            >
              API Requests Remaining
            </h2>

            <div
              style={{
                color: "#4BDEAC",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {getRequestsNumber()}
            </div>
          </div>
        </div>

        <Link
          href={"/dashboard/useractions"}
          id="add-balance"
          style={{
            width: "100%",
            maxWidth: "600px",
            backgroundColor: "#00A884",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          <p
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            Add Balance
          </p>
        </Link>
      </div>

      <div
        className="copyright-area-bottom"
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#040A14",
          color: "white",
          fontSize: "12px",
        }}
      >
        <p>
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            OPENUP©
          </Link>{" "}
          2024. All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default UserDashboard;
