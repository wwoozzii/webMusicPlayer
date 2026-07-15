import { usePlayerStore } from "../../../player/playerStore";

export const TrackList = () => {
  const tracks = usePlayerStore((state) => state.tracks);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const toggleTrack = usePlayerStore((state) => state.toggleTrack);

  return (
    <div>
      <ul>
        {tracks.map((track) => {
          const isCurrent = currentTrack?.id === track.id;
          const buttonLabel = isCurrent && isPlaying ? "⏸ Pause" : "▶ Play";

          return (
            <li key={track.id}>
              <strong>{track.name}</strong>
              <button onClick={() => toggleTrack(track)}>{buttonLabel}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
