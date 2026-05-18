import { describe, expect, test } from "bun:test";
import { describeActivity, parseLine, type FeedEvent } from "../src/lib/feed";

describe("feed parser", () => {
  test("accepts AgentCallback events", () => {
    const event = parseLine(
      "2026-05-18 20:00:00 | mira | codex | AgentCallback | maw-js | session-1 » projected state ready",
    );

    expect(event?.event).toBe("AgentCallback");
    expect(event?.message).toBe("projected state ready");
  });

  test("describes AgentCallback activity", () => {
    const event: FeedEvent = {
      timestamp: "2026-05-18 20:00:00",
      oracle: "mira",
      host: "codex",
      event: "AgentCallback",
      project: "maw-js",
      sessionId: "session-1",
      message: "projected state ready",
      ts: Date.now(),
    };

    expect(describeActivity(event)).toBe("projected state ready");
  });
});
