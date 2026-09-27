import { usePlayerStore } from "../../../player/playerStore";
import { formatTime } from "../../../player/utils/formatTime";
import s from "./TrackList.module.scss";

export const TrackList = () => {
  const tracks = usePlayerStore((state) => state.tracks);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const currentTime = usePlayerStore((state) => state.currentTime);

  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const toggleTrack = usePlayerStore((state) => state.toggleTrack);

  return (
    <div>
      <ul>
        {tracks.map((track) => {
          const isCurrent = currentTrack?.id === track.id;
          const buttonLabel = isCurrent && isPlaying ? "⏸ Pause" : "▶ Play";
          const choto = isCurrent && isPlaying ? currentTime : track.duration;

          return (
            <li key={track.id} className={s.line}>
              <div
                className={`${s.stroka} ${isPlaying && isCurrent ? s.active : ""}`}
                onClick={() => toggleTrack(track)}
              >
                <span>{`${track.name}`}</span>
                <span>{`${track.author}`}</span>
                <span>{`${formatTime(choto)}`}</span>
                {/* <button onClick={() => toggleTrack(track)}>
                  {buttonLabel}
                </button> */}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
