import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { setTrack } from "../../player/playerSlice";

interface fileUploaderProps {
  onTrackUpload: (url: string, name: string) => void;
}

export const FileUploader = ({ onTrackUpload }: fileUploaderProps) => {
  const [loadFile, setLoadFile] = useState<boolean>(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const trackUrl = URL.createObjectURL(file);
      onTrackUpload(trackUrl, file.name);
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
