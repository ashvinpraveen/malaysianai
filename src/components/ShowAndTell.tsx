import Link from "next/link";

const ShowAndTell = () => {
  return (
    <section id="show-and-tell" className="py-20 md:py-28 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <div className="w-full md:w-[55%]">
            <p className="label-default text-foreground/60 mb-3">Show and Tell Thursdays</p>
            <h2 className="section-title text-foreground">Show and Tell Thursdays</h2>
            <p className="body-default text-foreground/70 mt-3">
              Every Thursday we have an open day where builders can share what
              they&#39;re tinkering with, what they&#39;re learning, and learn from other
              builders.
            </p>
            <p className="body-default text-foreground/70 mt-3">
              The show and tell session happens at 4pm, though you&#39;re invited to
              cowork with us from 11am till then too.
            </p>
            <p className="body-default text-foreground/70 mt-4">
              (
              <Link
                href="/showandtell"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Join a show and tell session
              </Link>
              )
            </p>
          </div>
          <div className="w-full md:w-[45%]">
            <div
              className="h-64 md:h-72 lg:h-80 w-full rounded-2xl border border-dashed border-border/70 bg-background/80"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowAndTell;
