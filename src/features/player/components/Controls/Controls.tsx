import { usePlayerStore } from "../../playerStore";

export const Controls = () => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const prevTrack = usePlayerStore((state) => state.prevTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    <div>
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
