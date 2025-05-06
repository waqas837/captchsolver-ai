"use client";
import "../globals.css";
import { CONFIG } from "@/lib/Config";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Favicon */}
        <link rel="shortcut icon" href="/assets/images/fav.png" />

        {/* CSS Stylesheets */}
        <link
          rel="stylesheet"
          href={`${CONFIG.frontendUrl}/dashboard/assets/css/plugins/fontawesome-6.css`}
        />
        <link
          rel="stylesheet"
          href={`${CONFIG.frontendUrl}/dashboard/assets/css/plugins/unicons.css`}
        />
        <link
          rel="stylesheet"
          href={`${CONFIG.frontendUrl}/dashboard/assets/css/plugins/swiper.min.css`}
        />
        <link
          rel="stylesheet"
          href={`${CONFIG.frontendUrl}/dashboard/assets/css/vendor/metismenu.css`}
        />
        <link
          rel="stylesheet"
          href={`${CONFIG.frontendUrl}/dashboard/assets/css/vendor/bootstrap.min.css`}
        />
        <link
          rel="stylesheet"
          href={`${CONFIG.frontendUrl}/dashboard/assets/css/style.css`}
        />

        {/* JavaScript Scripts - Deferred for Performance */}
        <Script
          src={`${CONFIG.frontendUrl}/dashboard/assets/js/plugins/jquery.min.js`}
          strategy="beforeInteractive"
        />
        <Script
          src={`${CONFIG.frontendUrl}/dashboard/assets/js/vendor/metismenu.js`}
          strategy="lazyOnload"
        />
        <Script
          src={`${CONFIG.frontendUrl}/dashboard/assets/js/plugins/bootstrap.min.js`}
          strategy="lazyOnload"
        />
        <Script
          src={`${CONFIG.frontendUrl}/dashboard/assets/js/plugins/swiper.js`}
          strategy="lazyOnload"
        />
        <Script
          src={`${CONFIG.frontendUrl}/dashboard/assets/js/plugins/contact.form.js`}
          strategy="lazyOnload"
        />
        <Script
          src={`${CONFIG.frontendUrl}/dashboard/assets/js/main.js`}
          strategy="lazyOnload"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
