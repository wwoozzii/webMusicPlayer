import { describe, expect, it } from "vitest";
import { formatTime } from "./formatTime";

describe("formatTime", () => {
  it("должен корректно форматировать стандартное время в минутах и секнундах", () => {
    expect(formatTime(65)).toBe("01:05");
    expect(formatTime(60)).toBe("01:00");
    expect(formatTime(9)).toBe("00:09");
  });

  it("должен возращать '00:00', если прежано 0", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("должен возвращать '00:00', если передано NaN", () => {
    expect(formatTime(NaN)).toBe("00:00");
  });

  it("должен округлять дробные секунды в меньшую сторону", () => {
    expect(formatTime(65.9)).toBe("01:05");
  });
});
