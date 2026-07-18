import { useEffect } from "react";

export const useAudioVolume = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  currentVolume: number,
) => {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = currentVolume;
    }
  }, [currentVolume, audioRef]);
};
