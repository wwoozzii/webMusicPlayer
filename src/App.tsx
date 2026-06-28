import { useState } from "react";
import { PlayerBar } from "./features/player/components/PlayerBar/PlayerBar";
import { FileUploader } from "./features/playlists/components/FileUploader/FileUploader";

function App() {
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null);
  const [trackName, setTrackName] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleCurrentTrack = (url: string, name: string) => {
    setCurrentTrackUrl(url);
    setTrackName(name);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
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
    </div>
  );
}

export default App;
