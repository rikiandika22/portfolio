export default function GradientTransitionPanel() {
  return (
    <section
      id="transition"
      data-panel-id="transition"
      aria-hidden="true"
      role="presentation"
      className="w-full h-28 sm:h-36 flex-shrink-0 relative box-border overflow-hidden select-none pointer-events-none lg:w-screen lg:min-w-[100vw] lg:h-full"
      style={{
        background:
          "var(--gradient-transition, linear-gradient(180deg, var(--color-page-background, #F1EFE9) 0%, #A2CBE8 24%, var(--color-accent-primary, #2196F3) 58%, var(--color-surface-dark-blue, #104A7B) 100%))",
      }}
    >
      <style jsx>{`
        @media (min-width: 1024px) {
          section {
            --gradient-transition: linear-gradient(
              90deg,
              var(--color-page-background, #F1EFE9) 0%,
              #A2CBE8 24%,
              var(--color-accent-primary, #2196F3) 58%,
              var(--color-surface-dark-blue, #104A7B) 100%
            );
          }
        }
      `}</style>
    </section>
  );
}
