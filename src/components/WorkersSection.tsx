const WorkersSection = () => {
  return (
    <section className="py-24 md:py-36 bg-dark-teal text-cream">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="label-default text-cream/60 uppercase tracking-widest mb-4">
            Resident voices
          </p>
          <h2 className="section-title text-cream mb-4">What past residents are saying</h2>
          <p className="body-default text-cream/70">
            Share testimonials from founders, engineers, and researchers who built in the residency.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`chat-${index}`}
              className="rounded-2xl border border-cream/15 bg-cream/5 p-6 h-40"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkersSection;
