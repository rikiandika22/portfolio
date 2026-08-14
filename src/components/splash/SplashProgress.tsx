export default function SplashProgress() {
  return (
    <div className="splash-progress-wrapper w-full max-w-[260px] sm:max-w-[340px] flex flex-col items-center mx-auto opacity-0">
      <div className="w-full h-px bg-white/20 relative overflow-hidden">
        <div className="splash-progress-bar absolute inset-y-0 left-0 w-full bg-white origin-left scale-x-0" />
      </div>
    </div>
  );
}
