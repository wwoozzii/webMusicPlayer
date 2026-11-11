import { parseBlob } from "music-metadata";
import { useState } from "react";

export interface ParsedTrack {
  name: string;
  author: string;
  trackUrl: string;
  coverUrl: string;
  duration: number;
}

export const useAudioParser = (defCover: string) => {
  const [isParsing, setIsParsing] = useState<boolean>(false);

  const parseAudioFile = async (file: File): Promise<ParsedTrack | null> => {
    setIsParsing(true);

    let trackUrl: string | null = null;
    let coverUrl: string | null = null;
    try {
      const metadata = await parseBlob(file);
      trackUrl = URL.createObjectURL(file);

      const name =
        metadata.common.title ||
        file.name.replace(/\.[^/.]+$/, "") ||
        "unknown";
      const author = metadata.common.artist ?? "unknown";
      const duration = metadata.format.duration ?? 0;

      const pic = metadata.common.picture?.[0];
      if (pic) {
        const cleanBytes = new Uint8Array(pic.data);
        const blob = new Blob([cleanBytes], { type: pic.format });
        coverUrl = URL.createObjectURL(blob);
      }

      return {
        name,
        author,
        trackUrl,
        coverUrl: coverUrl ?? defCover,
        duration,
      };
    } catch (error) {
      if (trackUrl) URL.revokeObjectURL(trackUrl);
      if (coverUrl) URL.revokeObjectURL(coverUrl);
      console.error("Ошибка чтения файла", error);
      return null;
    } finally {
      setIsParsing(false);
    }
  };
  return { parseAudioFile, isParsing };
};
