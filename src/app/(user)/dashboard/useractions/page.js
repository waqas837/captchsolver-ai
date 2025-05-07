"use client";
import { CONFIG } from "@/lib/Config";
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_stripePK);

const Actions = () => {
  const [selectedCurrency, setSelectedCurrency] = useState({
    value: "BTC",
    text: "Bitcoin",
    iconPath: "./assets/images/currency/bitcoin.png",
  });
  const [paymentMethod, setPaymentMethod] = useState("crypto");
  const [amount, setAmount] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [username, setUsername] = useState("");
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  useEffect(() => {
    const userToken =
      typeof window !== "undefined" && localStorage.getItem("userToken");
    // if (!userToken) {
    //   window.location.href = "/index.html";
    // }

    // Fetch user info
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${CONFIG.backendUrl}/user/getuserinfo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });

        const data = await response.json();
        if (data.result && data.result[0].apiTokenDashboard) {
          setUsername(data.result[0].username);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const logout = () => {
    typeof window !== "undefined" && localStorage.removeItem("userToken");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const selectOption = (value, text, iconPath) => {
    setSelectedCurrency({ value, text, iconPath });
    setDropdownOpen(false);
  };

  const togglePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const processPayment = async () => {
    const userToken =
      typeof window !== "undefined" && localStorage.getItem("userToken");

    if (!amount || amount < 5) {
      setResponseMessage("Enter a valid amount at least 5$ !");
      return;
    }

    if (paymentMethod === "crypto") {
      await createCryptoInvoice(amount, userToken);
    } else {
      await createStripePayment(amount, userToken);
    }
  };

  const createCryptoInvoice = async (amount, userToken) => {
    const currency = selectedCurrency.value;
    let data = { currency, amount };

    try {
      const response = await fetch(`${CONFIG.backendUrl}/user/createInvoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        console.log("result", result);
        window.location.href = result.invoice.data.invoicePublicUrl;
      } else {
        setResponseMessage("Failed to Process. Please contact support.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to create invoice!");
    }
  };

  const createStripePayment = async (amount, userToken) => {
    try {
      const stripe = await stripePromise;
      amount = parseInt(amount);
      if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const response = await fetch(
        `${CONFIG.backendUrl}/user/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      );

      const data = await response.json();
      if (data.sessionId) {
        stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert("Error creating checkout session.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to create Stripe checkout!");
    }
  };

  const toggleApiKeyVisibility = () => {
    setApiKeyVisible(!apiKeyVisible);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const currencyOptions = [
    {
      value: "BTC",
      text: "Bitcoin",
      icon: "./assets/images/currency/bitcoin.png",
    },
    {
      value: "USDTTRC20",
      text: "USDTTRC20",
      icon: "./assets/images/currency/usdt.png",
    },
    {
      value: "LTC",
      text: "Litecoin",
      icon: "./assets/images/currency/litecoin.png",
    },
    {
      value: "ALGO",
      text: "Algorand",
      icon: "./assets/images/currency/algorand.png",
    },
    { value: "TRX", text: "TRON", icon: "./assets/images/currency/tron.png" },
    {
      value: "ETH",
      text: "Ethereum",
      icon: "./assets/images/currency/ethereum.png",
    },
    {
      value: "USDC-POLYGON",
      text: "USDC-Polygon",
      icon: "./assets/images/currency/usdc.png",
    },
    {
      value: "USDCBEP20",
      text: "USDCBEP20",
      icon: "./assets/images/currency/usdc.png",
    },
    {
      value: "BNB",
      text: "Binance Coin",
      icon: "./assets/images/currency/bnb.png",
    },
  ];

  return (
    <div className="dash-board-main-wrapper">
      <div className="main-center-content-m-left">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            background: "#0d1117",
            padding: "20px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Select Payment Method
          </h1>

          {/* Payment Method Toggle */}
          <div style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
            <button
              id="crypto-toggle"
              className={`payment-toggle ${
                paymentMethod === "crypto" ? "active-toggle" : ""
              }`}
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "14px",
                borderRadius: "5px 0 0 5px",
                border: "1px solid #30363d",
                background: paymentMethod === "crypto" ? "#33b89f" : "#161b22",
                color: "white",
                cursor: "pointer",
                fontWeight: paymentMethod === "crypto" ? "bold" : "normal",
              }}
              onClick={() => togglePaymentMethod("crypto")}
            >
              Pay with Crypto
            </button>
            <button
              id="stripe-toggle"
              className={`payment-toggle ${
                paymentMethod === "stripe" ? "active-toggle" : ""
              }`}
              style={{
                flex: 1,
                padding: "10px",
                fontSize: "14px",
                borderRadius: "0 5px 5px 0",
                border: "1px solid #30363d",
                background: paymentMethod === "stripe" ? "#33b89f" : "#161b22",
                color: "white",
                cursor: "pointer",
                fontWeight: paymentMethod === "stripe" ? "bold" : "normal",
              }}
              onClick={() => togglePaymentMethod("stripe")}
            >
              Pay with Stripe
            </button>
          </div>

          {/* Crypto Payment Section */}
          {paymentMethod === "crypto" && (
            <div id="crypto-section">
              <style>
                {`
                  .custom-dropdown {
                    position: relative;
                    width: 100%;
                  }

                  .dropdown-button {
                    width: 100%;
                    padding: 12px;
                    font-size: 16px;
                    border-radius: 5px;
                    border: 1px solid #30363d;
                    background: #161b22;
                    color: white;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 10px;
                  }

                  .dropdown-button img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                  }

                  .dropdown-list {
                    display: ${dropdownOpen ? "block" : "none"};
                    position: absolute;
                    width: 100%;
                    background: #161b22;
                    border: 1px solid #30363d;
                    border-radius: 5px;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    max-height: 200px;
                    overflow-y: auto;
                    z-index: 10;
                  }

                  .dropdown-list li {
                    padding: 10px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    color: white;
                  }

                  .dropdown-list li:hover {
                    background: #30363d;
                  }

                  .dropdown-list img {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;
                  }

                  .payment-toggle.active-toggle {
                    background: #33b89f;
                    font-weight: bold;
                  }
                `}
              </style>

              <div style={{ width: "160px" }} className="custom-dropdown">
                <div className="dropdown-button" onClick={toggleDropdown}>
                  <img
                    id="selected-icon"
                    src={selectedCurrency.iconPath}
                    alt={selectedCurrency.text}
                  />
                  <span id="selected-text">{selectedCurrency.text}</span>
                </div>
                <ul className="dropdown-list" id="dropdown-list">
                  {currencyOptions.map((option) => (
                    <li
                      key={option.value}
                      onClick={() =>
                        selectOption(option.value, option.text, option.icon)
                      }
                    >
                      <img src={option.icon} alt={option.text} />
                      {option.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Stripe Payment Section */}
          {paymentMethod === "stripe" && (
            <div id="stripe-section" style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  borderRadius: "5px",
                  border: "1px solid #30363d",
                  background: "#161b22",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <img
                  src="https://url-shortener.me/V81"
                  alt="Stripe"
                  style={{ width: "20px", height: "20px" }}
                />
                <span>Pay with credit/debit card</span>
              </div>
            </div>
          )}

          <input
            type="number"
            id="amount"
            min="5"
            placeholder="Enter amount in $"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #30363d",
              background: "#161b22",
              color: "white",
            }}
          />

          <button
            onClick={processPayment}
            id="submitBtn"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "none",
              background: "#33b89f",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Submit
          </button>

          <p id="response" style={{ color: "white", textAlign: "center" }}>
            {responseMessage}
          </p>
        </div>
      </div>

      <div className="copyright-area-bottom">
        <p>
          <a href="#">Captchasolver.ai©</a> 2025. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Actions;
