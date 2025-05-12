"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/lib/Config";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const captchaRef = useRef(null);
  const router = useRouter();

  // Load saved email on component mount if available
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Please complete the CAPTCHA");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${CONFIG.backendUrl}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          "h-captcha-response": captchaToken,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.message === "LoggedIn Successfully.") {
        // Handle remember me functionality
        if (formData.rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);

          // Store token with longer expiry if server sends a separate token
          if (data.longLivedToken) {
            localStorage.setItem("userToken", data.longLivedToken);
          } else {
            localStorage.setItem("userToken", data.token);
          }
        } else {
          // Remove remembered email if remember me is unchecked
          localStorage.removeItem("rememberedEmail");
          localStorage.setItem("userToken", data.token);
        }

        // Set session indicator
        sessionStorage.setItem("isLoggedIn", "true");

        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      // Reset captcha after submission attempt
      if (captchaRef.current) {
        captchaRef.current.resetCaptcha();
      }
      setCaptchaToken(null);
    }
  };

  return (
    <div className="log-in-area-start rts-section-gap bg-smooth-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="single-form-s-wrapper">
              <div className="head">
                <span>Welcome Back</span>
                <h5 className="title">Login to continue</h5>
              </div>
              <div className="body">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={{ textAlign: "left", margin: "20px 0" }}>
                    <HCaptcha
                      ref={captchaRef}
                      sitekey={process.env.NEXT_PUBLIC_H_captcha_Site_key}
                      onVerify={(token) => {
                        setCaptchaToken(token);
                        console.log("hCaptcha token:", token);
                      }}
                      onExpire={() => {
                        setCaptchaToken(null);
                        console.log("hCaptcha token expired");
                      }}
                      onError={(err) => {
                        console.error("hCaptcha error:", err);
                        setCaptchaToken(null);
                      }}
                    />
                  </div>

                  <div className="check-wrapper">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link href="/reset">Forgot password?</Link>
                  </div>

                  <button
                    type="submit"
                    className="rts-btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>

                  <p>
                    Don't have an account?{" "}
                    <Link className="ml--5" href="/registration">
                      Sign Up for Free
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

export default Login;
