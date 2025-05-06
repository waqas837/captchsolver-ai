"use client";
import "../globals.css";
import { useEffect } from "react";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";
import Script from "next/script";

export default function RootLayout({ children, params }) {
  const lang = params?.lang || "en";

  useEffect(() => {
    const initSidebar = () => {
      if (window.$ && window.jQuery) {
        console.log("Initializing sidebar...");
        window.$(".menu-toggle").on("click", function () {
          window.$(".sidebar").toggleClass("active");
        });
      } else {
        console.error("jQuery not loaded yet");
      }
    };

    // Check if jQuery is available after scripts load
    const checkJQuery = setInterval(() => {
      if (window.$ && window.jQuery) {
        clearInterval(checkJQuery);
        initSidebar();
      }
    }, 500);

    return () => clearInterval(checkJQuery);
  }, []);

  return (
    <html lang={lang}>
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" href="/assets/images/fav.png" />
        <title>Captchasolver.ai - Automate captchas</title>

        {/* CSS Styles */}
        <link rel="stylesheet" href="/assets/css/plugins/fontawesome-6.css" />
        <link rel="stylesheet" href="/assets/css/plugins/unicons.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper.min.css" />
        <link rel="stylesheet" href="/assets/css/vendor/metismenu.css" />
        <link rel="stylesheet" href="/assets/css/vendor/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />

        {/* Prism for syntax highlighting */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css"
        />
      </head>
      <body className="index-three dark-version">
        <Header />
        <main>{children}</main>

        {/* Back to Top Button */}
        <div className="progress-wrap">
          <svg className="progress-circle svg-content" viewBox="-1 -1 102 102">
            <path
              d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
              className="progress-path"
            />
          </svg>
        </div>

        <Footer />

        {/* ✅ Load jQuery from CDN */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js"
          strategy="beforeInteractive"
          onLoad={() => console.log("✅ jQuery loaded successfully")}
        />

        {/* ✅ Load scripts in correct order */}
        <Script
          src="/assets/js/vendor/metismenu.js"
          strategy="afterInteractive"
          onLoad={() => console.log("✅ MetisMenu loaded")}
        />
        <Script
          src="/assets/js/plugins/bootstrap.min.js"
          strategy="lazyOnload"
          onLoad={() => console.log("✅ Bootstrap loaded")}
        />
        <Script
          src="/assets/js/plugins/swiper.js"
          strategy="lazyOnload"
          onLoad={() => console.log("✅ Swiper loaded")}
        />
        <Script
          src="/assets/js/plugins/contact.form.js"
          strategy="lazyOnload"
          onLoad={() => console.log("✅ Contact form script loaded")}
        />
        <Script
          src="/assets/js/main.js"
          strategy="lazyOnload"
          onLoad={() => console.log("✅ Main.js loaded")}
        />

        {/* Sidebar Toggle Fix */}
        <Script
          id="sidebar-toggle"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("DOMContentLoaded", function() {
                if (window.$) {
                  console.log("✅ Initializing sidebar...");
                  $(".menu-toggle").on("click", function () {
                    $(".sidebar").toggleClass("active");
                  });
                } else {
                  console.error("❌ jQuery not found for sidebar toggle.");
                }
              });
            `,
          }}
        />

        {/* Back-to-Top CSS Animation */}
        <style>{`
          .progress-wrap {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            cursor: pointer;
          }
          .progress-path {
            transition: stroke-dashoffset 10ms linear;
            stroke-dasharray: 307.919, 307.919;
            stroke-dashoffset: 307.919;
          }
        `}</style>
      </body>
    </html>
  );
}
