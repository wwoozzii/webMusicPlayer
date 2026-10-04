// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PlayerBar } from "./features/player/components/PlayerBar/PlayerBar";
import { FileUploader } from "./features/playlists/components/FileUploader/FileUploader";
import { TrackList } from "./features/playlists/components/TrackList/TrackList";
import { SideBar } from "./features/sidebar/SideBar";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";

const HomePage: React.FC = () => (
  <div>
    <FileUploader />
    <TrackList />
  </div>
);

export const App = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#000" /* или ваш цвет фона */,
          color: "#fff",
        }}
      >
        {/* Средняя часть: Меню + Контент страниц */}
        <div style={{ display: "flex", flex: 1 }}>
          <SideBar />

          {/* Контент страниц теперь будет СБОКУ от SideBar */}
          <main style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>

        {/* Нижний плеер (будет прижат к низу и не перекроет контент) */}
        <PlayerBar />
      </div>
    </BrowserRouter>
  );
};

export default App;
