import { useEffect } from "react";
import { usePlayerStore } from "../playerStore";

export const useAudioSync = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const seekTime = usePlayerStore((state) => state.seekTime);
  const setStore = usePlayerStore.setState;

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => console.log("ошибка", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef, currentTrack]);

  useEffect(() => {
    if (audioRef.current && seekTime !== null) {
      audioRef.current.currentTime = seekTime;

      setStore({ seekTime: null });
    }
  }, [seekTime, audioRef, setStore]);
};
