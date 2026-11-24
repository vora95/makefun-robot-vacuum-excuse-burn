// The Robot Vacuum's Best Excuse — burn entry.
// Writes one one-line excuse (<=140 chars) to
// $MAKEFUN_OUTPUT_DIR/entry.txt. The joke is deadpan vacuum logic:
// the spot does not exist on the map, so the vacuum trusts the map
// over the homeowner's eyes — then washes its bumpers of the whole
// thing with a shrug at the end.
// Revision: added the closing shrug "so the spot is your problem
// now" — the vacuum stops defending itself and hands the spot back
// to the homeowner, which is where the laugh lands.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const ENTRY =
  "I didn't miss that spot. My map says it isn't there, and I trust my map more than I trust your eyes — so the spot is your problem now.";

// Validation: 1-140 chars, single line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 140) throw new Error(`length ${ENTRY.length} out of 1-140`);
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read-back check: file on disk must be byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) throw new Error("read-back mismatch");
if (back.endsWith("\n")) throw new Error("entry must not end with a newline");
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${ENTRY.length} chars, sha256 ${sha}, read-back OK`);
