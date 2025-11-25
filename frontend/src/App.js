import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Stats from "./pages/stats";
import Health from "./pages/health";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/code/:code" element={<Stats />} />
        <Route path="/healthz" element={<Health />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
