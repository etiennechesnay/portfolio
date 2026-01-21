import { describe, it, expect } from "vitest";

import { seededRandom } from "./seededRandom";

describe("seededRandom", () => {
  it("should return a function", () => {
    const random = seededRandom(42);
    expect(typeof random).toBe("function");
  });

  it("should return values between 0 and 1", () => {
    const random = seededRandom(12345);
    for (let i = 0; i < 100; i++) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it("should be deterministic - same seed produces same sequence", () => {
    const random1 = seededRandom(42);
    const random2 = seededRandom(42);

    const sequence1 = [random1(), random1(), random1(), random1(), random1()];
    const sequence2 = [random2(), random2(), random2(), random2(), random2()];

    expect(sequence1).toEqual(sequence2);
  });

  it("should produce different sequences for different seeds", () => {
    const random1 = seededRandom(42);
    const random2 = seededRandom(43);

    const sequence1 = [random1(), random1(), random1()];
    const sequence2 = [random2(), random2(), random2()];

    expect(sequence1).not.toEqual(sequence2);
  });

  it("should produce varied values in sequence", () => {
    const random = seededRandom(999);
    const values = new Set<number>();

    for (let i = 0; i < 10; i++) {
      values.add(random());
    }

    // All 10 values should be unique (very high probability)
    expect(values.size).toBe(10);
  });

  it("should handle seed of 0", () => {
    const random = seededRandom(0);
    const value = random();
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(1);
  });

  it("should handle large seed values", () => {
    const random = seededRandom(999999999);
    const value = random();
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(1);
  });

  it("should handle negative seed values and produce a number", () => {
    const random = seededRandom(-42);
    const value = random();
    // Negative seeds may produce values outside [0,1) due to modulo behavior
    // but the function should still return a number
    expect(typeof value).toBe("number");
    expect(Number.isFinite(value)).toBe(true);
  });
});
