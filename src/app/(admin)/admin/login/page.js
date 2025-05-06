"use client";
import { CONFIG } from "@/lib/Config";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(`${CONFIG.backendUrl}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");
        localStorage.setItem("adminToken", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <main
      className="register page-login"
      style={{
        backgroundColor: "rgb(13, 16, 30)",
        height: "100vh",
        paddingTop: 30,
      }}
    >
      <div className="dash-board-main-wrapper">
        <div className="main-center-content-m-left center-content">
          <div className="rts-register-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    className="single-form-s-wrapper"
                    style={{ backgroundColor: "rgb(13, 16, 30)" }}
                  >
                    <div className="head">
                      <span>Admin Panel</span>
                      <h5 className="title">Login to continue</h5>
                    </div>
                    <div className="body">
                      {error && <p style={{ color: "red" }}>{error}</p>}
                      <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                          <input
                            type="email"
                            placeholder="Enter your mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="rts-btn btn-primary">
                          Sign In
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLoginForm;
