import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';


export default function Login() {
  const [email, setEmail] = useState("sysmap@sysmap.com");
  const [senha, setSenha] = useState("sysmap");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/pedidos");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <img src={logo} alt="Logo da VendeAI" style={styles.logo} />
        <h2>Login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c4054",
    padding: "1rem",
    color: "#fff"
  },
  form: {
    backgroundColor: "#0d182c",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    height: "400px",
    maxWidth: "400px",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #1c2b40",
    backgroundColor: "#1c2b40",
    color: "#fff"
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem"
  },
  logo: {
    width: "200px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
};
