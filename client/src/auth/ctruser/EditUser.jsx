import React, { useState } from "react";

function EditUser() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(
        `http://localhost:5000/api/edit-users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setMessage("User updated successfully!");
      } else {
        setMessage(data.message || "Failed to update user");
      }
    } catch {
      setMessage("Error updating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        padding: "1rem",
        boxShadow: "0 2px 8px #eee",
        borderRadius: 8,
      }}
    >
      <h2 style={{ textAlign: "center", color: "#007bff" }}>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>User ID:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          {loading ? "Updating..." : "Update User"}
        </button>
      </form>
      {message && (
        <div
          style={{
            marginTop: 16,
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default EditUser;
