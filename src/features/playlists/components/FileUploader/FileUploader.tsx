import { parseBlob } from "music-metadata";
import React, { useState } from "react";
import defCover from "../../../../assets/defCover.png";
import { usePlayerStore } from "../../../player/playerStore";

const handleLongText = (text: string, maxLength: number = 30): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const FileUploader = () => {
  const addTrack = usePlayerStore((state) => state.addTrack);
  const [loadFile, setLoadFile] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let trackUrl: string | null = null;
    let coverUrl;

    try {
      const metadata = await parseBlob(file);
      trackUrl = URL.createObjectURL(file);

      coverUrl = defCover;
      const pic = metadata.common.picture?.[0];

      if (pic) {
        const cleanBytes = new Uint8Array(pic.data);
        const blob = new Blob([cleanBytes], { type: pic.format });

        coverUrl = URL.createObjectURL(blob);
      }

      const rawName =
        metadata.common.title || file.name.replace(/\.[^/.]+$/, "unknown");
      const rawAuthor = metadata.common.artist ?? "unknown";

      addTrack({
        url: trackUrl,
        name: handleLongText(rawName),
        author: handleLongText(rawAuthor),
        id: crypto.randomUUID(),
        duration: metadata.format.duration ?? 0,
        cover: coverUrl,
      });

      setLoadFile(!loadFile);
    } catch (error) {
      if (trackUrl) URL.revokeObjectURL(trackUrl);
      if (coverUrl) URL.revokeObjectURL(coverUrl);
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
