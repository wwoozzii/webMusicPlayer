import { useState } from "react";
import { FileUploader } from "../../playlists/components/FileUploader/FileUploader";

export const Search = () => {
  const [IsOpen, SetIsOpen] = useState<boolean>(false);

  return (
    <>
      <input />
      <button
        onClick={() => {
          SetIsOpen(!IsOpen);
        }}
      >
        {IsOpen ? "Закрыть" : "Загрузить"}
      </button>
      {IsOpen ? (
        <div>
          <FileUploader />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
