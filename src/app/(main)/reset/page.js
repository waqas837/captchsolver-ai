"use client"; // Needed if using app directory in Next.js 13+

import Link from "next/link";
import React, { useState } from "react";
import { CONFIG } from "@/lib/Config";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${CONFIG.backendUrl}/user/forgotpassword/${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage(data.message || "Failed to send reset link.");
      }
    } catch (error) {
      console.error("Reset error:", error);
      setMessage("Something went wrong. Please try again.");
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
                <h5 className="title">Reset Your Password</h5>
                <p className="mb--20">
                  Strong passwords include numbers, letters, and punctuation
                  marks.
                </p>
              </div>
              <div className="body">
                <form id="resetPassword" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div className="check-wrapper">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
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
                    {loading ? "Sending..." : "Send Reset Link"}
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

export default Reset;
