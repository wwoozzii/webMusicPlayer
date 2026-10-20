import { parseBlob } from "music-metadata";
import React, { useState } from "react";
import defCover from "../../../../assets/defCover.png";
import { usePlayerStore } from "../../../player/playerStore";

export const FileUploader = () => {
  const addTrack = usePlayerStore((state) => state.addTrack);
  const [loadFile, setLoadFile] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const metadata = await parseBlob(file);
      const trackUrl = URL.createObjectURL(file);

      let coverUrl = defCover;
      const pic = metadata.common.picture?.[0];

      if (pic) {
        const cleanBytes = new Uint8Array(pic.data);
        const blob = new Blob([cleanBytes], { type: pic.format });

        coverUrl = URL.createObjectURL(blob);
      }

      addTrack({
        url: trackUrl,
        //TODO: добавить обрезку названия для второго случая
        name: metadata.common.title || file.name.replace(".mp3", ""),
        //TODO: добавить обрезку названия для второго случая
        author: metadata.common.artist ?? "",
        id: crypto.randomUUID(),
        duration: metadata.format.duration ?? 0,
        cover: coverUrl,
      });

      setLoadFile(!loadFile);
    } catch (error) {
      console.error("Ошибка чтения файла", error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={handleFileChange} />
      <h3>{loadFile ? "файл выбран" : ""}</h3>
    </div>
  );
};
