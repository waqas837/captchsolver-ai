 
import Link from "next/link";
import React from "react";

const Navbar = () => {
  // <script>
  //               let usertoken = localStorage.getItem("userToken");
  //               if (usertoken) {
  //                 let loginElm = document.getElementById("login");
  //                 let getstarted = document.getElementById("getstarted");
  //                 loginElm.textContent = "Logout";
  //                 getstarted.textContent = "Dashboard";
  //                 getstarted.onclick = (e) => {
  //                   e.preventDefault(); // it will prevent defult its href link to navigate
  //                   window.location.href =
  //                     "/dashboard";
  //                 };
  //                 loginElm.onclick = (e) => {
  //                   e.preventDefault();
  //                   localStorage.removeItem("userToken");
  //                   window.location.reload();
  //                 };
  //               }
  //             </script>
  return (
    <>
      <header className="header-style-three header--sticky">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-three-area">
                <Link href="/" className="logo-area">
                  <img
                    src="assets/images/logo/07.svg"
                    alt="logo"
                    loading="lazy"
                  />
                </Link>
                <div className="nav-area-main d-xl-block d-lg-block d-md-none d-sm-none d-none">
                  <nav>
                    <ul>
                      <li>
                        <Link href="/" className="links-main">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link className="links-main" href="/#features">
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link className="links-main" href="/#pricing">
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Link className="links-main" href="/documentation">
                          Documentation
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="button-area">
                  <Link id="login" href="/log-in">
                    Login
                  </Link>
                  <Link
                    id="getstarted"
                    href="/registration"
                    className="rts-btn btn-primary"
                  >
                    Get Started
                  </Link>
                </div>

                <div
                  className="menu-btn d-xl-none d-lg-none d-md-block d-sm-block"
                  id="menu-btn"
                >
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="14" width="20" height="2" fill="#33B89F"></rect>
                    <rect y="7" width="20" height="2" fill="#33B89F"></rect>
                    <rect width="20" height="2" fill="#33B89F"></rect>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="anywhere-home" className=""></div>
      {/* <!-- header style two --> */}
      <div id="side-bar" className="side-bar header-two">
        <button className="close-icon-menu">
          <i className="far fa-times"></i>
        </button>

        {/* <!-- mobile menu area start --> */}
        <div className="mobile-menu-main">
          <nav className="nav-main mainmenu-nav mt--30">
            <ul className="mainmenu metismenu" id="mobile-menu-active">
              <li className="parent">
                <Link href="/" className="main">
                  Home
                </Link>
              </li>
              <li className="parent">
                <Link href="/#pricing" className="main">
                  Pricing
                </Link>
              </li>
              <li className="parent">
                <Link href="/log-in" className="main">
                  Login
                </Link>
              </li>
              <li className="parent">
                <Link href="/registration" className="main">
                  Signup
                </Link>
              </li>
              <li className="parent">
                <Link href="/documentation" className="main">
                  Documentation
                </Link>
              </li>
            </ul>
          </nav>

          <div className="rts-social-style-one pl--20 mt--100">
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
        {/* <!-- mobile menu area end --> */}
      </div>
    </>
  );
};

export default Navbar;
