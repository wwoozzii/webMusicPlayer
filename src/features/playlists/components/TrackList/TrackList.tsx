import type { Track } from "../../../../App";

interface TrackListProps {
  onAddTrack: () => void;
  tracks: Track[];
}

export const TrackList = ({ onAddTrack, tracks }: TrackListProps) => {
  return (
    <div>
      <button onClick={onAddTrack}>Добавить</button>

      {tracks.map((prev) => (
        <li key={prev.id}>
          <strong>{prev.name}</strong>
        </li>
      ))}
    </div>
  );
};
