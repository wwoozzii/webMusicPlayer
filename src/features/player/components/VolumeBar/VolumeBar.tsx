import { useCallback, useEffect, useRef, useState } from "react";
import { Vmute, Volume } from "../../../../shared";
import { usePlayerStore } from "../../playerStore";
import s from "./VolumeBar.module.scss";

export const VolumeBar = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const currentVolume = usePlayerStore((state) => state.currentVolume);
  const setCurrentVolume = usePlayerStore((state) => state.setCurrentVolume);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMute, setIsMute] = useState<boolean>(false);
  const currentVolumeRef = useRef<number>(currentVolume || 1);
  const progressPercent = currentVolume > 0 ? (currentVolume / 1.0) * 100 : 0;

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
    <div className={s.container}>
      <button
        className={s.btn}
        onClick={() => {
          toggleMute();
        }}
      >
        {isMute || currentVolume === 0 ? <Vmute /> : <Volume />}
      </button>
      <div className={s.slider} ref={sliderRef} onMouseDown={handleMouseDown}>
        <div className={s.bg}>
          <div
            className={s.fill}
            style={{ width: `${currentVolume * 100}%` }}
          />
          <div
            className={`${s.thumb} ${isDragging ? s.dragging : ""}`}
            style={{ left: `${progressPercent}%` }}
          />
        </div>
        {/* <span className={s.volume}>{Math.round(currentVolume * 100)}%</span> */}
      </div>
    </div>
  );
};
