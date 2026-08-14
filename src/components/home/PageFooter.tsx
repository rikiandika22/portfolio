export default function PageFooter() {
  return (
    <footer className="flex items-center justify-between w-full">
      {/* Left — Copyright */}
      <span className="text-sm font-normal text-text-primary">
        © 2026 Portfolio
      </span>

      {/* Center — Scroll indicator space */}
      <div className="flex-1 flex justify-center">
        <ScrollIndicator />
      </div>

      {/* Right — Credit */}
      <span className="text-sm font-normal text-text-primary">
        Design &amp; Code by Riki Andika
      </span>
    </footer>
  );
}

function ScrollIndicator() {
  return (
    <div
      className="flex flex-col items-center gap-1"
      aria-label="Scroll down"
      role="presentation"
    >
      <span className="text-xs font-normal text-text-muted uppercase tracking-widest">
        Scroll
      </span>
      <div className="w-px h-6 bg-text-muted" />
    </div>
  );
}
