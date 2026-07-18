import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../playerStore";

export const ProgressBar = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const updateTime = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      //позже переписать в хук
      const rect = sliderRef.current.getBoundingClientRect();
      const reletiveX = clientX - rect.left;
      let newTime = reletiveX / rect.width;
      newTime = Math.max(0, Math.min(1, newTime));

      setCurrentTime(Math.round(newTime * 100) / 100);
    },
    [setCurrentTime],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateTime(e.clientX);
  };

  //позже переписать в хук
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updateTime(e.clientX);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, updateTime]);

  return (
    <div>
      <div style={{ width: "200px" }}>
        <div
          ref={sliderRef}
          style={{
            height: "10px",
            background: "#ccc",
            cursor: "pointer",
            position: "relative",
          }}
          onMouseDown={handleMouseDown}
        >
          <div
            style={{
              width: `${currentTime * 100}%`,
              height: "100%",
              background: "black",
            }}
          />
        </div>
        <span>{Math.round(currentTime * 100)}%</span>
      </div>
    </div>
  );
};
