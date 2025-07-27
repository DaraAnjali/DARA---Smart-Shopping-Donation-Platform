import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = { name, email, password };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
  const userObj = {
    name: data.name,
    email: data.email,
  };
  localStorage.setItem("dara_user", JSON.stringify(userObj));
  setUser(userObj);
  navigate('/');
}
 else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Name" value={name} required onChange={e => setName(e.target.value)} style={styles.input} />
        <input type="email" placeholder="Email" value={email} required onChange={e => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} style={styles.input} />
        <button type="submit" style={styles.button}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginTop: "50px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Register;
