import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../playerStore";
import { formatTime } from "../../utils/formatTime";
import s from "./ProgressBar.module.scss";

export const ProgressBar = () => {
  const duration = usePlayerStore((state) => state.duration);
  const seek = usePlayerStore((state) => state.seek);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const currentTime = usePlayerStore((state) => state.currentTime);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragTime, setDragTime] = useState<number>(0);

  const displayTime = isDragging ? dragTime : currentTime;
  const progressPercent = duration > 0 ? (displayTime / duration) * 100 : 0;

  // расчет времени по кордам Х
  const calculateTimeFromX = useCallback(
    (clientX: number): number => {
      if (!progressBarRef.current || duration <= 0) return 0;

      const cube = progressBarRef.current.getBoundingClientRect();
      const clickX = clientX - cube.left;
      const width = cube.width;

      const ratio = Math.max(0, Math.min(1, clickX / width));
      const targetTime = ratio * duration;
      return targetTime;
    },
    [duration],
  );

  // начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration <= 0) return;

    setIsDragging(true);
    const newTime = calculateTimeFromX(e.clientX);
    setDragTime(newTime);
  };

  // события мыши
  useEffect(() => {
    if (!isDragging) return;
    // движение
    const handleMouseMove = (e: MouseEvent) => {
      const newTime = calculateTimeFromX(e.clientX);
      setDragTime(newTime);
    };
    // отпускание
    const handleMouseUp = (e: MouseEvent) => {
      const finalTime = calculateTimeFromX(e.clientX);

      seek(finalTime);
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, calculateTimeFromX, seek]);

  return (
    <div className={s.container}>
      <span className={s.time}>{formatTime(displayTime)}</span>
      <div
        ref={progressBarRef}
        className={s.wrapper}
        onMouseDown={handleMouseDown}
      >
        <div className={s.bg}>
          <div className={s.fill} style={{ width: `${progressPercent}%` }} />
          <div
            className={`${s.thumb} ${isDragging ? s.dragging : ""}`}
            style={{ left: `${progressPercent}%` }}
          />
        </div>
      </div>
      <span className={s.time}>{formatTime(duration)}</span>
    </div>
  );
};
