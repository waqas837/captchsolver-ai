"use client";
import { CONFIG } from "@/lib/Config";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newBalance, setNewBalance] = useState("");
  const modalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();

    // Setup event listener for clicks outside modal
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getAuthHeaders = () => {
    const adminToken = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    };
  };

  const fetchUsers = async (query = "") => {
    try {
      const response = await fetch(
        `${CONFIG.backendUrl}/admin/getusers?search=${query || ""}`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      const result = await response.json();
      if (result.data) {
        setUsers(result.data);
        generatePaymentData(result.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const generatePaymentData = (userData) => {
    // Generate mock payment data based on users
    const paymentData = userData.map((user) => {
      // Generate random date within last 30 days
      const randomDate = new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];

      return {
        id: user.id,
        userId: user.id,
        userName: user.username,
        amount: user.balance || 0,
        date: randomDate,
        status: "Completed",
      };
    });

    setPayments(paymentData);
  };

  const logout = () => {
    try {
      localStorage.removeItem("adminToken");
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewBalance(user.balance || 0);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const validateBalance = (value) => {
    // Prevent negative values
    if (value < 0) return "";

    // Remove leading zeros
    if (value.toString().startsWith("0") && value.toString().length > 1) {
      return value.toString().replace(/^0+/, "");
    }

    return value;
  };

  const handleBalanceChange = (e) => {
    const validatedValue = validateBalance(e.target.value);
    setNewBalance(validatedValue);
  };

  const handleBalanceBlur = (e) => {
    if (e.target.value.trim() === "") {
      setNewBalance(0);
    }
  };

  const saveBalance = async () => {
    if (!selectedUser || newBalance === "") {
      alert("Invalid user or balance");
      return;
    }

    try {
      const response = await fetch(`${CONFIG.backendUrl}/admin/updatebalance`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          userId: selectedUser.id,
          balance: newBalance,
        }),
      });

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }

      const result = await response.json();

      if (response.ok) {
        alert("Balance updated successfully!");

        // Update the users state with the new balance
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? { ...user, balance: newBalance }
              : user
          )
        );

        // Update payments data
        generatePaymentData(
          users.map((user) =>
            user.id === selectedUser.id
              ? { ...user, balance: newBalance }
              : user
          )
        );

        closeModal();
      } else {
        alert(result.message || "Failed to update balance");
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchUsers(value);
  };

  return (
    <div className="dash-board-main-wrapper">
      <div className="left-side-bar">
        <div className="overlay-mobile-area"></div>
        <div className="inner">
          <div className="single-menu-wrapper">
            <a
              href="#"
              className="single-menu active openuptip"
              flow="right"
              tooltip="Search"
            >
              <div className="icon">
                <img src="/dashboard/assets/images/icons/01.png" alt="icons" />
              </div>
              <p>Home</p>
            </a>
          </div>
          <div className="single-menu-wrapper" style={{ marginTop: "-50px" }}>
            <button onClick={logout} className="single-menu">
              <div className="icon">
                <img src="/dashboard/assets/images/icons/09.png" alt="icons" />
              </div>
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
      <div className="main-center-content-m-left">
        <div className="search__generator">
          <div className="nav-search-between">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-home"
                  type="button"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >
                  <img
                    src="/dashboard/assets/images/icons/10.png"
                    alt="icons"
                  />
                  Users
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="pills-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                >
                  <img
                    src="/dashboard/assets/images/icons/11.png"
                    alt="icons"
                  />
                  Payments
                </button>
              </li>
            </ul>
          </div>

          <div className="tab-content mt--50" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <div className="row g-5">
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ color: "white" }}>Users</h3>
                  <input
                    id="searchUser"
                    type="text"
                    placeholder="Search user..."
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{
                      padding: "5px",
                      width: "100%",
                      marginBottom: "10px",
                      border: "0.1px solid white",
                    }}
                  />
                  <table
                    border="1"
                    cellSpacing="0"
                    cellPadding="5"
                    style={{ width: "100%", textAlign: "left", color: "white" }}
                  >
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Balance ($)</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody id="userTable">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td id={`balance-${user.id}`}>
                            ${user.balance || 0}
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => openModal(user)}
                              style={{
                                backgroundColor: "#33B89F",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                color: "white",
                              }}
                            >
                              Edit Balance
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              <div className="row g-5">
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ color: "white" }}>Payment History</h3>
                  <table
                    border="1"
                    cellSpacing="0"
                    cellPadding="5"
                    style={{ width: "100%", textAlign: "left", color: "white" }}
                  >
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody id="payments-table">
                      {payments.map((payment, index) => (
                        <tr key={`${payment.userId}-${index}`}>
                          <td>{payment.userId}</td>
                          <td>${payment.amount}</td>
                          <td>{payment.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedUser && (
          <div
            id="editBalanceModal"
            className="modal"
            style={{ display: "block" }}
          >
            <div className="modal-content" ref={modalRef}>
              <span
                id="closeModal"
                onClick={closeModal}
                className="close"
                style={{
                  cursor: "pointer",
                  float: "right",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                &times;
              </span>
              <h2 style={{ color: "white" }}>
                Edit Balance for{" "}
                <span id="modalUsername">{selectedUser.username}</span>
              </h2>
              <input
                id="balanceInput"
                type="number"
                value={newBalance}
                onChange={handleBalanceChange}
                onBlur={handleBalanceBlur}
                style={{
                  padding: "8px",
                  margin: "10px 0",
                  width: "100%",
                }}
              />
              <button
                id="saveBalance"
                style={{
                  backgroundColor: "#33b89f",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  color: "white",
                  marginTop: "10px",
                }}
                onClick={saveBalance}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
