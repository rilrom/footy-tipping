import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Leaderboard from "./pages/Leaderboard";
import Results from "./pages/Results";
import Tips from "./pages/Tips";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
      }}
    >
      <Nav />
      <main style={{ padding: "2rem 1.5rem", maxWidth: "900px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 style={{ marginBottom: "0.5rem", color: "#1a1a1a" }}>
                  Welcome, Riley & Charlotte! 👋
                </h1>
                <p style={{ color: "#666" }}>
                  Select <strong>Tips</strong> to enter your picks for this
                  round.
                </p>
              </div>
            }
          />
          <Route path="/tips" element={<Tips />} />
          <Route path="/results" element={<Results />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}
