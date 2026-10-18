// src/App.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./features/navigation/Navigation";
import { PlayerBar } from "./features/player/components/PlayerBar/PlayerBar";
import { FileUploader } from "./features/playlists/components/FileUploader/FileUploader";
import { TrackList } from "./features/playlists/components/TrackList/TrackList";
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
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <Navigation />
        <div style={{ display: "flex", flex: 1 }}>
          <main style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
        </div>

        <PlayerBar />
      </div>
    </BrowserRouter>
  );
};

export default App;
