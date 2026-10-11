//сборка всех компонентов
import { useRef } from "react";
import { useAudioSync } from "../../hooks/useAudioSync";
import { useAudioVolume } from "../../hooks/useAudioVolume";
import { usePlayerStore } from "../../playerStore";
import { Controls } from "../Controls/Controls";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { TrackInfo } from "../TrackInfo/TrackInfo";
import { VolumeBar } from "../VolumeBar/VolumeBar";
import s from "./PlayerBar.module.scss";
// import { Waveform } from "../waveform/Waveform";

export const PlayerBar = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const handleTrackEnded = usePlayerStore((state) => state.handleTrackEnded);

  useAudioSync(audioRef);
  useAudioVolume(audioRef);

  if (!currentTrack) return null;

  const handleaudio = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const audioLength = e.currentTarget.duration;

    if (!isNaN(audioLength)) {
      setDuration(audioLength);
    }
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    setCurrentTime(0);
  };
  const handletimeup = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const currentSeconds = e.currentTarget.currentTime;
    setCurrentTime(currentSeconds);
  };

  return (
    <div className={s.container}>
      <audio
        ref={audioRef}
        src={currentTrack?.url}
        onLoadedMetadata={handleaudio}
        onTimeUpdate={handletimeup}
        onEnded={handleTrackEnded}
      />

      {/*TODO: возможно позже вернуть блок волны (12.10.26) */}
      {/* <div>
        <Waveform audioRef={audioRef} />
      </div> */}

      <div className={s.wrapper}>
        <div className={s.trackinfo}>
          <TrackInfo />
        </div>

        <div className={s.centerWrapper}>
          <div className={s.controls}>
            <Controls />
          </div>
          <div className={s.progressbar}>
            <ProgressBar />
          </div>
        </div>

        <div className={s.volumebar}>
          <VolumeBar />
        </div>
      </div>
    </div>
  );
};
