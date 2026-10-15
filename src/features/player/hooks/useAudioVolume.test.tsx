import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { usePlayerStore } from "../playerStore";
import { useAudioVolume } from "./useAudioVolume";

const audio = document.createElement("audio");
const audioRef = { current: audio };
const { rerender } = renderHook(() => {
  useAudioVolume(audioRef);
});

describe("useAudioVolume", () => {
  beforeEach(() => {
    usePlayerStore.setState({
      currentVolume: 1,
      currentTrack: null,
    });
  });

  it("устанавливает громкость из стора при монтировании", () => {
    usePlayerStore.setState({ currentVolume: 0.7 });

    rerender();
    expect(audio.volume).toBe(0.7);
  });

  it("обновляет громкость при изменении currentVolume", () => {
    usePlayerStore.setState({ currentVolume: 0.2 });
    rerender();
    expect(audio.volume).toBe(0.2);
  });
});
