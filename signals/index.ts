import { Signal, signal } from "@preact/signals";

export const pageTitle = signal("Auth App");

export const signalsByName = new Map<string, Signal>([
  ["pageTitle", pageTitle],
]);
