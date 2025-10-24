export default function Page() {

  return (
    <main className="h-dvh overflow-y-auto snap-y snap-mandatory">
      <section
        className="h-dvh snap-start relative"
        aria-label="Landing Hero"
        data-section="hero"
      />


      <section
        className="h-dvh snap-start relative"
        aria-label="Market Preview"
        data-section="market-preview"
      />


      <section
        className="h-dvh snap-start relative"
        aria-label="Trade & Exchange"
        data-section="trade-exchange"
      />


      <section
        className="h-dvh snap-start relative"
        aria-label="Gacha Points"
        data-section="gacha"
      />


      <section
        className="h-dvh snap-start relative"
        aria-label="Final Call To Action"
        data-section="final-cta"
      />
    </main>
  );
}
