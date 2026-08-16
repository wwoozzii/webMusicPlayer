import { useEffect } from "react";
import { usePlayerStore } from "../playerStore";

export const useAudioVolume = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const currentVolume = usePlayerStore((state) => state.currentVolume);
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume;
    }
  }, [currentVolume, currentTrack, audioRef]);
};
