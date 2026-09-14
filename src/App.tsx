// src/App.tsx
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { RegisterForm } from "./features/auth/components/RegisterForm/RegisterForm";
import { PlayerBar } from "./features/player/components/PlayerBar/PlayerBar";
import { FileUploader } from "./features/playlists/components/FileUploader/FileUploader";
import { TrackList } from "./features/playlists/components/TrackList/TrackList";

// временно
const HomePage: React.FC = () => (
  <div>
    <h2>Моя медиатека</h2>
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
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </main>

        {/* временно */}
        <PlayerBar />
      </div>
    </BrowserRouter>
  );
};

export default App;
