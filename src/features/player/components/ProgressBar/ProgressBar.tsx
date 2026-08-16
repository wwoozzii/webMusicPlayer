import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../playerStore";
import { formatTime } from "../../utils/formatTime";

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
      console.log(targetTime);
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
    <div
      className="player-progress-container"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        userSelect: "none",
      }}
    >
      {/* 1. Время слева */}
      <span className="time-display">{formatTime(displayTime)}</span>

      {/* 2. Полоса прогресса */}
      <div
        ref={progressBarRef}
        className="progress-bar-wrapper"
        onMouseDown={handleMouseDown}
        style={{
          position: "relative",
          flexGrow: 1,
          height: "16px",
          width: "200px",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div
          className="progress-bar-bg"
          style={{
            position: "relative",
            width: "100%",
            height: "4px",
            backgroundColor: "#3e3e3e",
            borderRadius: "2px",
          }}
        >
          {/* Линия заполнения */}
          <div
            className="progress-bar-fill"
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              backgroundColor: "#1db954",
              borderRadius: "2px",
            }}
          />

          {/* Ползунок Thumb */}
          <div
            className="progress-bar-thumb"
            style={{
              position: "absolute",
              top: "50%",
              left: `${progressPercent}%`,
              transform: "translate(-50%, -50%)",
              width: isDragging ? "14px" : "12px",
              height: isDragging ? "14px" : "12px",
              backgroundColor: "#ffffff",
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
              transition: isDragging ? "none" : "width 0.1s, height 0.1s",
            }}
          />
        </div>
      </div>

      {/* 3. Длительность справа */}
      <span className="time-display">{formatTime(duration)}</span>
    </div>
  );
};
