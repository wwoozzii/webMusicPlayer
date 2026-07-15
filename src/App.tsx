import { PlayerBar } from "./features/player/components/PlayerBar/PlayerBar";
import { FileUploader } from "./features/playlists/components/FileUploader/FileUploader";
import { TrackList } from "./features/playlists/components/TrackList/TrackList";

function App() {
  return (
    <div>
      <FileUploader />
      <PlayerBar />
      <TrackList />
    </div>
  );
}

export default App;
