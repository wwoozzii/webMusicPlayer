//сборка всех компонентов
import { useEffect, useRef } from "react";
import { usePlayerStore } from "../../playerStore";

export const PlayerBar = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const prevTrack = usePlayerStore((state) => state.prevTrack);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("ошибка", err));
      console.log(isPlaying);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);
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
      }}
    >
      <audio ref={audioRef} src={currentTrack.url} />{" "}
      {/* Автопереключение по окончании трека! */}
      <div>
        <strong>Играет:</strong> {currentTrack.name}
      </div>
      <button onClick={prevTrack} style={{ marginRight: "10px" }}>
        ⏮ Пред.
      </button>
      <button onClick={togglePlay}>{isPlaying ? "⏸ Пауза" : "▶ Играть"}</button>
      <button onClick={nextTrack} style={{ marginLeft: "10px" }}>
        ⏭ След.
      </button>
    </div>
  );
};
