import { usePlayerStore } from "../../playerStore";
import s from "./TrackInfo.module.scss";

export const TrackInfo = () => {
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  if (!currentTrack) return null;

  return (
    <div className={s.container}>
      {/* <img src={} className={s.cover} /> */}

      <div className={s.textContainer}>
        <strong className={s.name}>{`${currentTrack.name}`}</strong>
        <strong className={s.author}>{` ${currentTrack.author}`}</strong>
      </div>
    </div>
  );
};
