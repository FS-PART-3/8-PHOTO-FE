export default function LoadingDots() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="flex w-fit space-x-4">
        <span className="h-5 w-5 animate-bounce rounded-full bg-[#efff04] [animation-delay:-0.3s]"></span>
        <span className="h-5 w-5 animate-bounce rounded-full bg-[#e6cb2fff] [animation-delay:-0.15s]"></span>
        <span className="h-5 w-5 animate-bounce rounded-full bg-[#cba315ff]"></span>
      </div>
    </div>
  );
}
