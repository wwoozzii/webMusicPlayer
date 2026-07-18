import { usePlayerStore } from "../../playerStore";

export const TrackInfo = () => {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  if (!currentTrack) return null;

  return (
    <div>
      <strong>Играет:</strong> {currentTrack.name}
    </div>
  );
};
