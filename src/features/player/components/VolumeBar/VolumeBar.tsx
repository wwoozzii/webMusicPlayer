import { useCallback, useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../../playerStore";

export const VolumeBar = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentVolume = usePlayerStore((state) => state.currentVolume);
  const setCurrentVolume = usePlayerStore((state) => state.setCurrentVolume);

  const [isDragging, setIsDragging] = useState<boolean>(false);

  const updateVolume = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect(); //узнает точные размеры и положение блока
      const relativeX = clientX - rect.left; //узнает положение мыши при клике
      let newVolume = relativeX / rect.width; //положение мыши в процентах относительно ширины(длины) блока, т.е новую громкость
      newVolume = Math.max(0, Math.min(1, newVolume)); //установка лимитов положения

      setCurrentVolume(Math.round(newVolume * 100) / 100); //округление числа до сотых
    },
    [setCurrentVolume],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateVolume(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) updateVolume(e.clientX);
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
  }, [isDragging, updateVolume]);

  return (
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
            width: `${currentVolume * 100}%`,
            height: "100%",
            background: "black",
          }}
        />
      </div>
      <span>{Math.round(currentVolume * 100)}%</span>
    </div>
  );
};
