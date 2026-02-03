const benefits = [
  {
    title: "Learn from like-minded builders",
    description:
      "Weekly show and tells every Thursday at 4pm. Share what you're working on and what you're figuring out, get feedback, and learn from others.",
  },
  {
    title: "Co-working space for serious builders",
    description:
      "Have space for focused work sessions, with room for random hallway convos that unlock your next breakthrough.",
  },
  {
    title: "Get support in what matters to you",
    description:
      "Whether you need technical, fundraising, product, GTM, content support - chances are there's people around who are tackling what you're struggling with",
  },
];

const Benefits = () => {
  return (
    <section id="program" className="pt-28 md:pt-36 pb-16 md:pb-20 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="mb-12">
          <p className="label-default text-foreground/60 mb-3">Program</p>
          <h2 className="section-title text-foreground">
            Bringing together Malaysia&#39;s most ambitious founders
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="relative pt-6 border-t border-border/60 flex flex-col"
            >
              <p className="label-default text-foreground/50">0{index + 1}</p>
              <h3 className="section-title text-2xl md:text-3xl text-foreground mt-4">
                {benefit.title}
              </h3>
              <p className="body-default text-foreground/70 mt-3">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
