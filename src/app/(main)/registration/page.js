"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/lib/Config";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to the terms and privacy policy.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${CONFIG.backendUrl}/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        router.push("/verify");
      } else if (data.status === "userExists") {
        alert("Email already exists. Try logging in instead.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rts-register-area rts-section-gap bg-smooth-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="single-form-s-wrapper">
              <div className="head">
                <span>Start your Journey</span>
                <h5 className="title">Create an account</h5>
              </div>
              <div className="body">
                <form onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="username"
                      placeholder="Full Name"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
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
                      placeholder="Enter your Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="check-wrapper">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        id="flexCheckDefault"
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
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                  <p>
                    If you have an account?
                    <Link className="ml--5" href="/log-in">
                      Sign in
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

export default Registration;
