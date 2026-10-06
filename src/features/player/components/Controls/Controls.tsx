import { PauseIcon, PlayIcon, SkipNext, SkipPrev } from "../../../../shared";
import { usePlayerStore } from "../../playerStore";
import s from "./Controls.module.scss";
export const Controls = () => {
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const prevTrack = usePlayerStore((state) => state.prevTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  //перекдлючение play/start находится в хуке useAudioSync

  return (
    <div className={s.container}>
      <button onClick={prevTrack} className={s.btn}>
        <SkipPrev />
      </button>
      <button onClick={togglePlay} className={`${s.btn} ${s.btn_play}`}>
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button onClick={nextTrack} className={s.btn}>
        <SkipNext />
      </button>
    </div>
  );
};
