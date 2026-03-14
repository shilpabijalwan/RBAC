/**
 * Button theme: base + variant class strings for the design system.
 * Add new variants here; Button.jsx consumes these.
 */

export const buttonBaseClasses =
  "rounded-lg px-4 py-2 text-sm font-medium focus:outline-none dark:focus:ring-offset-zinc-900";

export const buttonVariantClasses = {
  primary: "bg-blue-400 text-white hover:bg-blue-500 focus:ring-blue-500",
  secondary:
    "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
};
