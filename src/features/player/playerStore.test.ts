import { beforeEach, describe, expect, it } from "vitest";
import { usePlayerStore } from "./playerStore";

const mockTrack1 = {
  id: "10",
  name: "song1",
  author: "artist1",
  url: "1.mp3",
  duration: 430,
};
const mockTrack2 = {
  id: "11",
  name: "song2",
  author: "artist2",
  url: "2.mp3",
  duration: 228,
};

describe("usePlayerStore", () => {
  beforeEach(() => {
    const { reset } = usePlayerStore.getState();
    if (reset) reset();
  });

  it("SetCurrentVolume: должен менять громкость", () => {
    expect(usePlayerStore.getState().currentVolume).toBe(1);

    usePlayerStore.getState().setCurrentVolume(0.5);
    expect(usePlayerStore.getState().currentVolume).toBe(0.5);
  });

  it("togglePlay: долен корректно переключать Play/Pause", () => {
    expect(usePlayerStore.getState().isPlaying).toBe(false);

    usePlayerStore.getState().togglePlay();
    expect(usePlayerStore.getState().isPlaying).toBe(true);

    usePlayerStore.getState().togglePlay();
    expect(usePlayerStore.getState().isPlaying).toBe(false);
  });

  it("toggleTrack: должен корректно переключать трек на выбранный", () => {
    usePlayerStore.getState().addTrack(mockTrack1);
    usePlayerStore.getState().addTrack(mockTrack2);
    usePlayerStore.getState().setCurrentTrack(mockTrack1);

    usePlayerStore.getState().toggleTrack(mockTrack2);

    expect(usePlayerStore.getState().currentTrack).toEqual(mockTrack2);
  });

  it("nextTrack: должен переключать на след трек", () => {
    usePlayerStore.getState().addTrack(mockTrack1);
    usePlayerStore.getState().addTrack(mockTrack2);
    usePlayerStore.getState().setCurrentTrack(mockTrack1);

    usePlayerStore.getState().nextTrack();

    expect(usePlayerStore.getState().currentTrack).toEqual(mockTrack2);
  });

  it("prevTrack: должен переключать на пред трек", () => {
    usePlayerStore.getState().addTrack(mockTrack1);
    usePlayerStore.getState().addTrack(mockTrack2);
    usePlayerStore.getState().setCurrentTrack(mockTrack2);

    usePlayerStore.getState().prevTrack();

    expect(usePlayerStore.getState().currentTrack).toEqual(mockTrack1);
  });

  it("handleTrackEnded: должен переключатся на след трек если в треклисте более чем 1 трек", () => {
    usePlayerStore.getState().addTrack(mockTrack1);
    usePlayerStore.getState().addTrack(mockTrack2);
    usePlayerStore.getState().setCurrentTrack(mockTrack1);

    usePlayerStore.getState().handleTrackEnded();

    expect(usePlayerStore.getState().currentTrack).toEqual(mockTrack2);
  });

  it("reset: должен сбрасывать состояние стора к начальным значениям", () => {
    const store = usePlayerStore.getState();

    store.addTrack(mockTrack1);
    store.setCurrentTrack(mockTrack1);
    store.setCurrentVolume(0.5);

    store.reset();

    expect(usePlayerStore.getState().tracks).toEqual([]);
    expect(usePlayerStore.getState().currentTrack).toBeNull();
    expect(usePlayerStore.getState().currentVolume).toBe(1);
    expect(usePlayerStore.getState().isPlaying).toBe(false);
  });
});
