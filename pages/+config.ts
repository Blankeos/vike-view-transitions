import vikeReact from "vike-react/config";
import type { Config } from "vike/types";

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  title: "View Transitions Vike",
  description: "Demo showcasing view transitions in Vike.",
  extends: vikeReact,
} satisfies Config;
