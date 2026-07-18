import { useEffect } from "react";
import { usePlayerStore } from "../playerStore";

export const useAudioSync = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("ошибка", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, audioRef]);
};
