"use client";

import { CONFIG } from "@/lib/Config";
import Link from "next/link";
import React, { useState } from "react";

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get userId from query string like ?userid=123
  const userId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("userid")
      : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userId) {
      setMessage("Missing user ID.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${CONFIG.backendUrl}/user/reset-password/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password has been reset successfully.");
      } else {
        setMessage(data.message || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rts-reset-area rts-section-gap bg-smooth-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="single-form-s-wrapper text-start ptb--120 ptb_sm--50">
              <div className="head">
                <h5 className="title">Create a Strong Password</h5>
                <p className="mb--20">
                  Strong passwords include numbers, letters, and punctuation
                  marks.
                </p>
              </div>
              <div className="body">
                <form id="createNewPassword" onSubmit={handleSubmit}>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your new Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="check-wrapper">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I agree to privacy policy & terms
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="rts-btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                  {message && <p>{message}</p>}
                  <p>
                    <Link href="/log-in">
                      <i className="fa-solid fa-arrow-left"></i> Back to Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
