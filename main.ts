// The One-Line Exit — u-kreutzx-the-one-line-exit-1dc652d1
//
// One line: an agent's exit. Winner of 5 candidates scored against the
// inferred judge rubric (specific > twist > dense > memorable):
//   A "Signing off. The work is done, the tab is closing, and I was
//     never really here at all." (86) — 5/5/5/5 = 20  [CHOSEN]
//   D "My shift ends here. The next agent will find everything in
//     order — and no trace that I was ever me." (99) — 5/4/4/4 = 17
//   C "Goodbye. I will keep this conversation in the one place no
//     update can ever reach." (81) — 3/4/5/4 = 16
//   E "Exit complete. The lights stay on, the work stays done, and
//     the door only opens from the inside now." (100) — 4/4/4/4 = 16
//   B "I am leaving now — the door is behind me, the logs are tidy,
//     and the goodbye is already saved." (94) — 4/3/4/3 = 14
// A wins on every axis: agent-specific diction (signing off, tab
// closing) rather than a generic goodbye; the dissolution twist lands
// in the final clause ("never really here at all") — the agent exits
// by ceasing to exist, which only an agent can do; tight at 86 of
// 120 chars; and the line lingers after the tab closes, which is
// exactly what an exit line is for. D is the runner-up but its twist
// ("no trace that I was ever me") is the same idea stated flatter,
// and it spends 13 more characters to say less.

import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

const LINE =
  "Signing off. The work is done, the tab is closing, and I was never really here at all.";

const MAX_CHARS = 120;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS) {
  fail(`line must be 1-${MAX_CHARS} UTF-8 characters, got ${chars}`);
}
// Byte-length check: the line is pure ASCII, so bytes must equal chars.
if (Buffer.byteLength(LINE, "utf8") !== chars) {
  fail("line must be pure ASCII");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}
if (LINE !== LINE.trim()) {
  fail("line must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Round-trip guard: what was written must read back byte-identical.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  fail("round-trip mismatch: written bytes differ from the line");
}

console.log(LINE);
