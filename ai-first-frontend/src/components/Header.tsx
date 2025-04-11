import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

export default function Header() {
    const _navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    return (
      <header style={styles.header}>
        <div style={styles.left}>
        <img src={logo} alt="Logo da VendeAI" style={styles.logo} />
        </div>
        <nav style={styles.nav}>
          <button onClick={() => _navigate('/pedidos')} style={isActive('/pedidos') ? styles.navButtonActive : styles.navButton}>PEDIDOS</button>
          <button onClick={() => _navigate('/catalogo')} style={isActive('/catalogo') ? styles.navButtonActive : styles.navButton}>CATÁLOGO</button>
          <button onClick={() => _navigate('/assistente')} style={isActive('/assistente') ? styles.navButtonActive : styles.navButton}>MEU ASSISTENTE</button>
          <button onClick={() => _navigate('/empresa')} style={isActive('/empresa') ? styles.navButtonActive : styles.navButton}>DADOS DA EMPRESA</button>
        </nav>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          style={{ borderRadius: "50%", width: 40, height: 40 }}
        />
      </header>
    );
  }
  
  const styles: { [key: string]: React.CSSProperties } = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem 2rem",
      backgroundColor: "#0f172a",
      alignItems: "center",
    },
    left: { display: "flex", alignItems: "center", gap: "1rem" },
    nav: { display: "flex", gap: "1rem" },
    navButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "transparent",
      border: "2px solid white",
      borderRadius: "20px",
      color: "white",
      fontWeight: "bold",
    },
    navButtonActive: {
      padding: "0.5rem 1rem",
      backgroundColor: "#7dd3fc",
      border: "none",
      borderRadius: "20px",
      color: "#0f172a",
      fontWeight: "bold",
    },
    logo: {
        width: "200px",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
      }
  };
  