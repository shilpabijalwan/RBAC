/**
 * Button theme: base + variant class strings for the design system.
 * Add new variants here; Button.jsx consumes these.
 */

export const buttonBaseClasses =
  "rounded-none px-4 py-2 text-sm font-medium tracking-wide focus:outline-none transition-all duration-150";

export const buttonVariantClasses = {
  primary:
    "text-white border border-transparent bg-gradient-to-br from-[var(--kp-primary)] to-[var(--kp-primary-dim)] hover:shadow-[0_0_15px_rgba(186,158,255,0.55)]",
  secondary:
    "border border-[rgba(65,71,91,0.2)] bg-transparent text-[var(--kp-secondary)] hover:bg-[rgba(98,250,227,0.08)]",
};
