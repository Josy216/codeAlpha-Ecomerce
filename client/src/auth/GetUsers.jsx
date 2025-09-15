import React, { useEffect, useState } from "react";

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "2rem",
  background: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  borderRadius: "8px",
  overflow: "hidden",
};
const thStyle = {
  background: "#007bff",
  color: "#fff",
  padding: "12px",
  textAlign: "left",
  fontWeight: 600,
};
const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};
const trHover = {
  background: "#f9f9f9",
};

function GetUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editMsg, setEditMsg] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/get-users");
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch {
      setError("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditMsg("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditMsg("");
    try {
      const response = await fetch(
        `http://localhost:5000/api/edit-users/${editUser.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editName, email: editEmail }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setEditMsg("User updated!");
        fetchUsers();
        setEditUser(null);
      } else {
        setEditMsg(data.message || "Failed to update user");
      }
    } catch {
      setEditMsg("Error updating user");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setDeleteLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/edit-users/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchUsers();
      } else {
        alert(data.message || "Failed to delete user");
      }
    } catch {
      alert("Error deleting user");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <div style={{ marginTop: "2rem" }}>Loading users...</div>;
  if (error)
    return (
      <div style={{ color: "red", marginTop: "2rem" }}>Error: {error}</div>
    );

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", color: "#007bff" }}>User List</h2>
      {users.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>
          No users found.
        </div>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} style={idx % 2 ? trHover : {}}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <span
                    title="Edit"
                    style={{
                      cursor: "pointer",
                      marginRight: 12,
                      color: "#007bff",
                      fontSize: 18,
                    }}
                    onClick={() => handleEdit(user)}
                  >
                    ✏️
                  </span>
                  <span
                    title="Delete"
                    style={{ cursor: "pointer", color: "red", fontSize: 18 }}
                    onClick={() => handleDelete(user.id)}
                  >
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 32,
              borderRadius: 8,
              minWidth: 320,
              boxShadow: "0 2px 8px #aaa",
            }}
          >
            <h3>Edit User</h3>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label>Name:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label>Email:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, marginTop: 4 }}
                />
              </div>
              <button
                type="submit"
                disabled={editLoading}
                style={{
                  width: "100%",
                  padding: 10,
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                }}
              >
                {editLoading ? "Updating..." : "Update User"}
              </button>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                style={{
                  width: "100%",
                  padding: 10,
                  marginTop: 8,
                  background: "#eee",
                  color: "#333",
                  border: "none",
                  borderRadius: 4,
                }}
              >
                Cancel
              </button>
            </form>
            {editMsg && (
              <div
                style={{
                  marginTop: 16,
                  color: editMsg.includes("updated") ? "green" : "red",
                }}
              >
                {editMsg}
              </div>
            )}
          </div>
        </div>
      )}
      {deleteLoading && (
        <div style={{ textAlign: "center", color: "#007bff", marginTop: 16 }}>
          Processing...
        </div>
      )}
    </div>
  );
}

export default GetUsers;
