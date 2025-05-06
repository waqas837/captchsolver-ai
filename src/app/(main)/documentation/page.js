"use client";
import React from "react";
import Head from "next/head";

const Documentation = () => {
  const [activeTab, setActiveTab] = React.useState({
    auth: "curl",
    classify: "curl",
    solve: "curl",
  });

  const [copyStatus, setCopyStatus] = React.useState({
    visible: false,
    type: "", // 'auth', 'classify', 'solve'
  });

  const handleTabChange = (section, tab) => {
    setActiveTab((prev) => ({ ...prev, [section]: tab }));
  };

  const handleCopy = (text, type) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStatus({ visible: true, type });
        setTimeout(() => setCopyStatus({ visible: false, type: "" }), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  // API examples data
  const apiExamples = {
    auth: {
      curl: `curl -d '{"key": "C-AI#...."}' https://api.captchasolver.ai/some_endpoint`,
      python: `import requests\n\npayload = {"key": "C-AI#...."}\nresponse = requests.get("https://api.captchasolver.ai/some_endpoint", json=payload)\nprint(response.json())`,
      javascript: `fetch("https://api.captchasolver.ai/some_endpoint", {\n  method: "POST",\n  body: JSON.stringify({"key": "C-AI#...."})\n})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error("Error:", error));`,
    },
    classify: {
      curl: `curl -X POST https://api.captchasolver.ai/classify \\\n-H "Content-Type: application/json" \\\n-d '{\n"variant": "cardistance",\n"image": "base64_encoded_data",\n"key": "C-AI#...."\n}'`,
      python: `import requests\n\nurl = "https://api.captchasolver.ai/classify"\nheaders = {\n"Content-Type": "application/json"\n}\ndata = {\n"variant": "cardistance",\n"image": "base64_encoded_data",\n"key": "C-AI#...."\n}\n\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json())`,
      javascript: `fetch("https://api.captchasolver.ai/classify", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    variant: "cardistance",\n    image: "base64_encoded_data",\n    key: "C-AI#...."\n  })\n})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error("Error:", error));`,
    },
    solve: {
      curl: `curl -X POST https://api.captchasolver.ai/solve \\\n-H "Content-Type: application/json" \\\n-d '{\n  "method": "roblox_signup",\n  "proxy": "",\n  "blob": "",\n  "key": "C-AI#",\n  "browser": "chrome",\n  "version": 133,\n  "os": "windows"\n}'`,
      python: `import requests\n\nurl = "https://api.captchasolver.ai/solve"\nheaders = {\n"Content-Type": "application/json"\n}\ndata = {\n"method": "roblox_signup",\n"proxy": "",\n"blob": "",\n"key": "C-AI#",\n"browser": "chrome",\n"version": 133,\n"os": "windows"\n}\n\nresponse = requests.post(url, headers=headers, json=data)\nprint(response.json())`,
      javascript: `fetch("https://api.captchasolver.ai/solve", {\n  method: "POST",\n  headers: {\n    "Content-Type": "application/json"\n  },\n  body: JSON.stringify({\n    method: "roblox_signup",\n    proxy: "",\n    blob: "",\n    key: "C-AI#",\n    browser: "chrome",\n    version: 133,\n    os: "windows"\n  })\n})\n.then(response => response.json())\n.then(data => console.log(data))\n.catch(error => console.error("Error:", error));`,
    },
  };

  const platforms = [
    "outlook",
    "twitter",
    "twitter_unlock",
    "roblox_signup",
    "roblox_login",
    "roblox_join",
    "ea",
    "github-signup",
    "roblox_wall",
    "airbnb-register",
    "tinder",
  ];

  const advancedFeatures = [
    "Bulk Solving",
    "Session Tracking",
    "Proxy Rotation",
    "Auto Retry",
    "Load Balancing",
    "Analytics",
  ];

  const responseCodes = [
    { status: 200, code: "SUCCESS", desc: "Request completed successfully" },
    {
      status: 400,
      code: "INVALID_REQUEST",
      desc: "Missing or malformed parameters",
    },
    { status: 403, code: "ERROR", desc: "Error" },
    { status: 500, code: "SERVER_ERROR", desc: "Internal server issue" },
  ];

  return (
    <>
      <Head>
        <title>CaptchaSolver API Documentation</title>
        <meta
          name="description"
          content="API documentation for CaptchaSolver service"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </Head>

      <main className="documentation-main">
        <div className="doc-header">
          <h1>CaptchaSolver API Documentation</h1>
          <p className="doc-version">Version 2.2.1</p>
        </div>

        <section className="doc-section">
          <h2>Overview</h2>
          <p>
            Automate CAPTCHA solving with AI-powered precision across multiple
            platforms. Our API provides fast, reliable solutions for even the
            most complex challenges.
          </p>
        </section>

        <section className="doc-section">
          <h2>Authentication</h2>
          <p>
            Secure your requests with API key authentication. Include your key
            in every request payload:
          </p>
          <div className="code-tabs">
            <div className="tab-buttons">
              <button
                className={`tab-btn ${
                  activeTab.auth === "curl" ? "active" : ""
                }`}
                onClick={() => handleTabChange("auth", "curl")}
              >
                curl
              </button>
              <button
                className={`tab-btn ${
                  activeTab.auth === "python" ? "active" : ""
                }`}
                onClick={() => handleTabChange("auth", "python")}
              >
                Python
              </button>
              <button
                className={`tab-btn ${
                  activeTab.auth === "javascript" ? "active" : ""
                }`}
                onClick={() => handleTabChange("auth", "javascript")}
              >
                JavaScript
              </button>
            </div>
            <div className="tab-content">
              <div
                className={`tab-pane ${
                  activeTab.auth === "curl" ? "active" : ""
                }`}
              >
                <pre>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(apiExamples.auth.curl)}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <code className="language-bash">{apiExamples.auth.curl}</code>
                </pre>
              </div>
              <div
                className={`tab-pane ${
                  activeTab.auth === "python" ? "active" : ""
                }`}
              >
                <pre>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(apiExamples.auth.python)}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <code className="language-python">
                    {apiExamples.auth.python}
                  </code>
                </pre>
              </div>
              <div
                className={`tab-pane ${
                  activeTab.auth === "javascript" ? "active" : ""
                }`}
              >
                <pre>
                  <button
                    className="copy-btn"
                    onClick={() => handleCopy(apiExamples.auth.javascript)}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <code className="language-javascript">
                    {apiExamples.auth.javascript}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Supported Platforms</h2>
          <div className="method-grid">
            {platforms.map((platform) => (
              <div key={platform} className="method-card">
                {platform}
              </div>
            ))}
          </div>

          <div className="missing-platform">
            <h3>Need Another Platform?</h3>
            <p>
              Contact our support team to request new platform integration:
              <br />
              <a
                href="mailto:support@captchasolver.ai"
                style={{ color: "#EF4444", fontWeight: 500 }}
              >
                support@captchasolver.ai
              </a>
            </p>
          </div>
        </section>

        <section className="doc-section">
          <h2>Core Endpoints</h2>

          <div className="endpoint-group">
            <h3>Image Classification</h3>
            <pre>
              <code>POST https://api.captchasolver.ai/classify</code>
            </pre>
            <p>Solve visual CAPTCHAs with AI-powered image recognition.</p>

            <h4>Request Example:</h4>
            <div className="code-tabs">
              <div className="tab-buttons">
                <button
                  className={`tab-btn ${
                    activeTab.classify === "curl" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("classify", "curl")}
                >
                  curl
                </button>
                <button
                  className={`tab-btn ${
                    activeTab.classify === "python" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("classify", "python")}
                >
                  Python
                </button>
                <button
                  className={`tab-btn ${
                    activeTab.classify === "javascript" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("classify", "javascript")}
                >
                  JavaScript
                </button>
              </div>
              <div className="tab-content">
                <div
                  className={`tab-pane ${
                    activeTab.classify === "curl" ? "active" : ""
                  }`}
                >
                  <pre>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(apiExamples.classify.curl)}
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <code className="language-bash">
                      {apiExamples.classify.curl}
                    </code>
                  </pre>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab.classify === "python" ? "active" : ""
                  }`}
                >
                  <pre>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(apiExamples.classify.python)}
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <code className="language-python">
                      {apiExamples.classify.python}
                    </code>
                  </pre>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab.classify === "javascript" ? "active" : ""
                  }`}
                >
                  <pre>
                    <button
                      className="copy-btn"
                      onClick={() =>
                        handleCopy(apiExamples.classify.javascript)
                      }
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <code className="language-javascript">
                      {apiExamples.classify.javascript}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="endpoint-group" style={{ marginTop: "35px" }}>
            <h3>Token Generation</h3>
            <pre>
              <code>POST https://api.captchasolver.ai/solve</code>
            </pre>
            <p>Obtain authentication tokens for protected endpoints.</p>

            <h4>Request Example:</h4>
            <div className="code-tabs">
              <div className="tab-buttons">
                <button
                  className={`tab-btn ${
                    activeTab.solve === "curl" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("solve", "curl")}
                >
                  curl
                </button>
                <button
                  className={`tab-btn ${
                    activeTab.solve === "python" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("solve", "python")}
                >
                  Python
                </button>
                <button
                  className={`tab-btn ${
                    activeTab.solve === "javascript" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("solve", "javascript")}
                >
                  JavaScript
                </button>
              </div>
              <div className="tab-content">
                <div
                  className={`tab-pane ${
                    activeTab.solve === "curl" ? "active" : ""
                  }`}
                >
                  <pre>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(apiExamples.solve.curl)}
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <code className="language-bash">
                      {apiExamples.solve.curl}
                    </code>
                  </pre>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab.solve === "python" ? "active" : ""
                  }`}
                >
                  <pre>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(apiExamples.solve.python)}
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <code className="language-python">
                      {apiExamples.solve.python}
                    </code>
                  </pre>
                </div>
                <div
                  className={`tab-pane ${
                    activeTab.solve === "javascript" ? "active" : ""
                  }`}
                >
                  <pre>
                    <button
                      className="copy-btn"
                      onClick={() => handleCopy(apiExamples.solve.javascript)}
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                    <code className="language-javascript">
                      {apiExamples.solve.javascript}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Response Codes</h2>
          <table className="doc-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {responseCodes.map((row, index) => (
                <tr key={index}>
                  <td>{row.status}</td>
                  <td>{row.code}</td>
                  <td>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="doc-section">
          <h2>Advanced Features</h2>
          <div className="method-grid">
            {advancedFeatures.map((feature) => (
              <div key={feature} className="method-card">
                {feature}
              </div>
            ))}
          </div>
        </section>
      </main>
      <style jsx>{`
        .copy-success {
          position: absolute;
          right: 40px;
          color: #10b981;
          font-size: 1rem;
          opacity: 1;
          transition: opacity 0.5s ease-out;
        }
        .copy-success.fade-out {
          opacity: 0;
        }
        .copy-btn {
          position: relative;
        }
      `}</style>
    </>
  );
};

export default Documentation;
