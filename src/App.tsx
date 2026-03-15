import { AppShell, Container } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Results from "./pages/Results";
import Tips from "./pages/Tips";

export default function App() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Nav />
      </AppShell.Header>

      <AppShell.Main>
        <Container size="md">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
