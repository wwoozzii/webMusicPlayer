import { useState } from "react";
import { PlayerBar } from "./features/player/components/PlayerBar/PlayerBar";
import { FileUploader } from "./features/playlists/components/FileUploader/FileUploader";
import { TrackList } from "./features/playlists/components/TrackList/TrackList";

export interface Track {
  id: number;
  name: string;
  url: string;
}

function App() {
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null);
  const [trackName, setTrackName] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [trackId, setTrackId] = useState<number | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleCurrentTrack = (url: string, name: string, id: number) => {
    setCurrentTrackUrl(url);
    setTrackName(name);
    setTrackId(id);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleAddTrack = () => {
    if (!currentTrackUrl || !trackName || !trackId) return;

    const isDublicate = tracks.some((t) => t.id === trackId);
    if (isDublicate) return;

    const newTrack: Track = {
      id: trackId,
      name: trackName,
      url: currentTrackUrl,
    };
    setTracks((prev) => [...prev, newTrack]);
  };

  return (
    <div>
      <FileUploader onTrackUpload={handleCurrentTrack} />

      <PlayerBar
        currentTrackUrl={currentTrackUrl}
        trackName={trackName}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
      />
      <TrackList onAddTrack={handleAddTrack} tracks={tracks} />
    </div>
  );
}

export default App;
