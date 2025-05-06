import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      {/* <!-- rts footer area start --> */}
      <div className="rts-footer-area bg-footer footer-two">
        <div className="container rts-section-gapTop pb--100">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-one-main-wrapper">
                <div className="footer-singl-wized left-logo">
                  <div className="head">
                    <a href="#">
                      <img src="assets/images/logo/07.svg" alt="logo" />
                    </a>
                  </div>
                  <div className="body">
                    <p className="dsic">
                      AI-Powered CAPTCHA Solutions for the Modern Web
                    </p>
                    <div className="social-style-two">
                      <ul>
                        <li>
                          <a href="https://discord.gg/bVTbw5CB">
                            <i className="fa-brands fa-discord"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://t.me/captchasolverai">
                            <i className="fa-brands fa-telegram"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="footer-singl-wized">
                  <div className="head">
                    <h6 className="title">Resources</h6>
                  </div>
                  <div className="body">
                    <ul className="menu">
                      <li>
                        <Link href="/documentation">API Docs</Link>
                      </li>
                      <li>
                        <Link href="https://status.captchasolver.ai/status/live">
                          Status
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="footer-singl-wized input-area">
                  <div className="head">
                    <h6 className="title">Enterprise</h6>
                  </div>
                  <div className="body">
                    <ul className="menu">
                      <li>
                        <a href="#">Custom Solutions</a>
                      </li>
                      <li>
                        <a href="#">Funcaptcha</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copy-right-start-two">
                <p>
                  <a href="#">CaptchaSolver.ai</a> © 2025. All Rights Reserved.
                </p>
                <ul>
                  <li>
                    <a href="#">Service Agreement</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
