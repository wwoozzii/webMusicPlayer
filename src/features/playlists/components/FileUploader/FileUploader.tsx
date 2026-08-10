import { parseBlob } from "music-metadata";
import React, { useState } from "react";
import { usePlayerStore } from "../../../player/playerStore";

export const FileUploader = () => {
  const addTrack = usePlayerStore((state) => state.addTrack);
  const [loadFile, setLoadFile] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const metadata = await parseBlob(file);
    const trackUrl = URL.createObjectURL(file);

    console.log(metadata.common.title);
    addTrack({
      url: trackUrl,
      name: metadata.common.title || file.name.replace(".mp3", ""),
      author: metadata.common.artist ?? "",
      id: crypto.randomUUID(),
      duration: metadata.format.duration ?? 0,
    });
    console.log(metadata.common);
    console.log(metadata.format);
    setLoadFile(!loadFile);
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleFileChange} />
      <h3>{loadFile ? "файл выбран" : ""}</h3>
    </div>
  );
};
