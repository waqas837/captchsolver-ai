import Link from "next/link";
import React from "react";

const Reset = () => {
  // Enter you emai to reset password
  return (
    <>
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
                  <form id="resetPassword">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your mail"
                      required
                    />

                    <div className="check-wrapper">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <label className="form-check-label" for="flexCheckDefault">
                          I agree to privacy policy & terms
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="rts-btn btn-primary">
                      Send Reset Link
                    </button>
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
    </>
  );
};

export default Reset;
