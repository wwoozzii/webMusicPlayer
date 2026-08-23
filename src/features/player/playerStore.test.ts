import { beforeEach, describe, expect, it } from "vitest";
import { usePlayerStore } from "./playerStore";

describe("usePlayerStore", () => {
  beforeEach(() => {
    const { reset } = usePlayerStore.getState();
    if (reset) reset();
  });

  it("должен менять громкость", () => {
    expect(usePlayerStore.getState().currentVolume).toBe(1);

    usePlayerStore.getState().setCurrentVolume(0.5);
    expect(usePlayerStore.getState().currentVolume).toBe(0.5);
  });
});
