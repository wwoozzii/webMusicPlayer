import React, { useState } from "react";
import { usePlayerStore } from "../../../player/playerStore";

export const FileUploader = () => {
  const addTrack = usePlayerStore((state) => state.addTrack);
  const [loadFile, setLoadFile] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const trackUrl = URL.createObjectURL(file);
      addTrack({ url: trackUrl, name: file.name });
      setLoadFile(!loadFile);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleFileChange} />
      <h3>{loadFile ? "файл выбран" : ""}</h3>
    </div>
  );
};
