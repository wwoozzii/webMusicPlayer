// src/App.tsx
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { PlayerBar } from "./features/player/components/PlayerBar/PlayerBar";
import { FileUploader } from "./features/playlists/components/FileUploader/FileUploader";
import { TrackList } from "./features/playlists/components/TrackList/TrackList";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";

// временно
const HomePage: React.FC = () => (
  <div>
    <FileUploader />
    <TrackList />
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div style={{ paddingBottom: "100px" }}>
        {/* временно*/}
        <nav
          style={{
            display: "flex",
            gap: "15px",
            padding: "15px",
            background: "#181818",
          }}
        >
          <Link to="/" style={{ color: "#fff" }}>
            Главная
          </Link>
          <Link to="/login" style={{ color: "#fff" }}>
            Вход
          </Link>
          <Link to="/register" style={{ color: "#fff" }}>
            Регистрация
          </Link>
        </nav>

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>

        {/* временно */}
        <PlayerBar />
      </div>
    </BrowserRouter>
  );
};

export default App;
