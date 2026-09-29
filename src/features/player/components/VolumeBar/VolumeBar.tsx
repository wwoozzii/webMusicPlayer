import { useCallback, useEffect, useRef, useState } from "react";
import { Vmute, Volume } from "../../../../shared";
import { usePlayerStore } from "../../playerStore";

export const VolumeBar = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentVolume = usePlayerStore((state) => state.currentVolume);
  const setCurrentVolume = usePlayerStore((state) => state.setCurrentVolume);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const currentVolumeRef = useRef<number>(currentVolume || 1);

  const updateVolume = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect(); //узнает точные размеры и положение блока
      const relativeX = clientX - rect.left; //узнает положение мыши при клике
      const rawVolume = relativeX / rect.width; //положение мыши в процентах относительно ширины(длины) блока, т.е новую громкость
      const newVolume = Math.max(0, Math.min(1, rawVolume)); //установка лимитов положения

      setCurrentVolume(newVolume);
    },
    [setCurrentVolume],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateVolume(e.clientX);
  };

  const toggleMute = () => {
    if (!isMute) {
      //мутим
      currentVolumeRef.current = currentVolume;
      setIsMute(true);
      setCurrentVolume(0);
    } else {
      //размут
      setIsMute(false);
      setCurrentVolume(currentVolumeRef.current || 0.5);
    }
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
    <div>
      <button
        onClick={() => {
          toggleMute();
        }}
      >
        {isMute || currentVolume === 0 ? (
          <Vmute width={24} height={24} />
        ) : (
          <Volume width={24} height={24} />
        )}{" "}
      </button>
      <div style={{ width: "200px" }}>
        <div
          ref={sliderRef}
          style={{
            height: "10px",
            background: "#ccc",
            cursor: "pointer",
            position: "relative",
            userSelect: "none",
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
    </div>
  );
};
