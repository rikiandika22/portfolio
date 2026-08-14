export default function IdentityName() {
  const lines = ["RIKI", "ANDIKA", "KHUSNA", "SAPUTRA"];

  return (
    <div
      className="font-bold leading-[0.95] text-text-primary uppercase text-[24px] sm:text-[34px] lg:text-[clamp(56px,6.6vw,104px)] tracking-tight"
      aria-label="Riki Andika Khusna Saputra"
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </div>
  );
}
