import Link from "next/link";
import React from "react";

const Resetpassword = () => {
  return (
    <div>
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
                  <form id="createNewPassword">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your new Password"
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
                        <label
                          className="form-check-label"
                          for="flexCheckDefault"
                        >
                          I agree to privacy policy & terms
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="rts-btn btn-primary">
                      Submit
                    </button>
                    <p>
                      <Link href="/log-in">
                        <i className="fa-solid fa-arrow-left"></i>Back to Login
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rts-cta-area rts-section-gapBottom bg_faq">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cta-main-wrapper bg_image">
                <div className="left">
                  <h3 className="title">
                    All set to level up <br />
                    your content game?
                  </h3>
                  <Link href="/about" className="rts-btn btn-primary">
                    Get Started Now
                  </Link>
                </div>
                <div className="right">
                  <img src="assets/images/cta/02.png" alt="cta-area" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
