import { CTAButton } from "./CTAButton";

const ShowAndTell = () => {
  return (
    <section id="show-and-tell" className="py-20 md:py-28 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="rounded-3xl p-8 md:p-12" style={{ backgroundColor: "#101D20" }}>
          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            <div className="w-full md:w-[55%]">
              <p className="label-default text-white/50 mb-3">Show and Tell Thursdays</p>
              <h2 className="section-title text-white">Join us for a Show and Tell Thursday</h2>
              <p className="body-default text-white/70 mt-3">
                Every Thursday we have an open day where builders can share what
                they&#39;re tinkering with, what they&#39;re learning, and learn from other
                builders.
              </p>
              <p className="body-default text-white/70 mt-3">
                The show and tell session happens at 4pm, though you&#39;re invited to
                cowork with us from 11am till then too.
              </p>
              <div className="mt-6">
                <CTAButton href="/residency/showandtell" variant="white" size="sm" showArrow isExternal={false}>
                  Join a show and tell session
                </CTAButton>
              </div>
            </div>
            <div className="w-full md:w-[45%]">
              <img
                src="/show-and-tell.jpg"
                alt="Show and Tell Thursdays"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowAndTell;
