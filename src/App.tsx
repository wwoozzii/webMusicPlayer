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
      <div style={{ paddingBottom: "100px" }}>
        <SideBar />
        <PlayerBar />

        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
