import type { Track } from "../../../../App";

interface TrackListProps {
  onAddTrack: () => void;
  tracks: Track[];
  onToggleTrack: (url: string, name: string, id: number) => void;
  onTogglePlay: () => void;
}

export const TrackList = ({
  onAddTrack,
  tracks,
  onToggleTrack,
  onTogglePlay,
}: TrackListProps) => {
  const igr = (url: string, name: string, id: number) => {
    onToggleTrack(url, name, id);
    onTogglePlay();
  };
  return (
    <div>
      <button onClick={onAddTrack}>Добавить</button>

      {tracks.map((prev) => (
        <li key={prev.id}>
          <strong>{prev.name}</strong>
          <button onClick={() => igr(prev.url, prev.name, prev.id)}>
            play
          </button>
        </li>
      ))}
    </div>
  );
};
