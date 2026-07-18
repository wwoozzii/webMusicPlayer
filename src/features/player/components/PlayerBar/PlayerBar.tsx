//сборка всех компонентов
import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../playerStore";
import { VolumeBar } from "../VolumeBar/VolumeBar";

export const PlayerBar = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const prevTrack = usePlayerStore((state) => state.prevTrack);
  const currentVolume = usePlayerStore((state) => state.currentVolume);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("ошибка", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume;
    }
  }, [currentVolume]);

  if (!currentTrack) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#222",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <audio ref={audioRef} src={currentTrack.url} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ flex: "1", minWidth: "150px" }}>
          <strong>Играет:</strong> {currentTrack.name}
        </div>

        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={prevTrack} style={{ marginRight: "10px" }}>
            ⏮ Пред.
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? "⏸ Пауза" : "▶ Играть"}
          </button>
          <button onClick={nextTrack} style={{ marginLeft: "10px" }}>
            ⏭ След.
          </button>
        </div>

        <div style={{ flex: "1", display: "flex", justifyContent: "flex-end" }}>
          <VolumeBar />
        </div>
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {/* <TrackBar /> */}
        <div style={{ color: "#555", fontSize: "12px" }}></div>
      </div>
    </div>
  );
};
