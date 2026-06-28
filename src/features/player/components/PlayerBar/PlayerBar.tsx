//сборка всех компонентов

import { useEffect, useRef } from "react";

interface PlayerBarProps {
  currentTrackUrl: string | null;
  trackName: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const PlayerBar = ({
  currentTrackUrl,
  trackName,
  isPlaying,
  onTogglePlay,
}: PlayerBarProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("ошибка", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackUrl]);
  if (!currentTrackUrl) return null;

  return (
    <div>
      <audio ref={audioRef} src={currentTrackUrl} />

      <div>
        {isPlaying ? (
          <>
            <strong>Сейчас играет:</strong> {trackName}
          </>
        ) : null}
      </div>

      <div>
        <button onClick={onTogglePlay}>{isPlaying ? "пауза" : "играть"}</button>
      </div>
    </div>
  );
};
