import React, { useState } from "react";
import defCover from "../../../../assets/defCover.png";
import type { ParsedTrack } from "../../../player/hooks/useAudioParser";
import { useAudioParser } from "../../../player/hooks/useAudioParser";
import { usePlayerStore } from "../../../player/playerStore";
import { formatLongText } from "../../../player/utils/formatLongText";
import s from "./FileUploader.module.scss";

export const FileUploader = () => {
  const [trackName, setTrackName] = useState("");
  const [trackAuthor, setTrackAuthor] = useState("");

  const addTrack = usePlayerStore((state) => state.addTrack);

  const { parseAudioFile } = useAudioParser(defCover);
  const [parsedTrack, setParsedTrack] = useState<ParsedTrack | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const trackData = await parseAudioFile(file);

    if (trackData) {
      setParsedTrack(trackData);
    }
  };

  const handleAddButton = () => {
    if (!parsedTrack) return;

    const { trackUrl, author, name, coverUrl, duration } = parsedTrack;

    const finalName = trackName.trim() !== "" ? trackName : name;
    const finalAuthor = trackAuthor.trim() !== "" ? trackAuthor : author;

    addTrack({
      id: crypto.randomUUID(),
      url: trackUrl,
      name: formatLongText(finalName, 30),
      author: formatLongText(finalAuthor, 30),
      duration: duration,
      cover: coverUrl,
    });
    setTrackName("");
    setTrackAuthor("");
  };

  return (
    <div className={s.container}>
      <div>
        <input type="file" accept="audio/mp3" onChange={handleFileChange} />
      </div>

      <input
        type="text"
        value={trackName}
        onChange={(e) => setTrackName(e.target.value)}
      />
      <input
        type="text"
        value={trackAuthor}
        onChange={(e) => setTrackAuthor(e.target.value)}
      />
      <button onClick={handleAddButton}>ДОБАВИТЬ</button>
    </div>
  );
};
