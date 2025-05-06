"use client";
import Link from "next/link";
import React from "react";

const Verify = () => {
  function openInbox() {
    window.open("https://mail.google.com/", "_blank");
  }

  return (
    <>
      <div className="log-in-area-start rts-section-gap bg-smooth-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-form-s-wrapper">
                <div className="head">
                  <h5 className="title">Please confirm your email address</h5>
                  <button
                    onClick={openInbox}
                    type="submit"
                    className="rts-btn btn-primary"
                  >
                    Open Email
                  </button>
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
    </>
  );
};

export default Verify;
