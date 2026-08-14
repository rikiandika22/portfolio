export default function GradientTransitionPanel() {
  return (
    <section
      id="transition"
      data-panel-id="transition"
      aria-hidden="true"
      role="presentation"
      className="w-screen min-w-[100vw] h-full flex-shrink-0 relative box-border overflow-hidden select-none pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, var(--color-page-background, #F1EFE9) 0%, #A2CBE8 24%, var(--color-accent-primary, #2196F3) 58%, var(--color-surface-dark-blue, #104A7B) 100%)",
      }}
    />
  );
}
