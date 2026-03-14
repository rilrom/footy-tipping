import { NavLink } from "react-router-dom";

export default function Nav() {
  const linkStyle = ({
    isActive,
  }: {
    isActive: boolean;
  }): React.CSSProperties => ({
    marginRight: "1.5rem",
    textDecoration: "none",
    color: isActive ? "#1a1a1a" : "#666",
    fontWeight: isActive ? "600" : "400",
    borderBottom: isActive ? "2px solid #1a1a1a" : "2px solid transparent",
    paddingBottom: "2px",
    fontSize: "0.95rem",
  });

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem 1.5rem",
        borderBottom: "1px solid #e5e5e5",
        backgroundColor: "#fff",
      }}
    >
      <span
        style={{
          fontWeight: "700",
          fontSize: "1.1rem",
          marginRight: "2.5rem",
          color: "#1a1a1a",
        }}
      >
        Footy Tipping 🏉
      </span>
      <NavLink to="/" end style={linkStyle}>
        Home
      </NavLink>
      <NavLink to="/tips" style={linkStyle}>
        Tips
      </NavLink>
      <NavLink to="/results" style={linkStyle}>
        Results
      </NavLink>
      <NavLink to="/leaderboard" style={linkStyle}>
        Leaderboard
      </NavLink>
    </nav>
  );
}
