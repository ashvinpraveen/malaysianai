"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";

const highlights = [
  {
    title: "Permanent base",
    description:
      "A dedicated space that residents can rely on every single day. Show up, build, and stay as long as needed.",
  },
  {
    title: "Heart of KL",
    description:
      "Centrally located in Kuala Lumpur, steps from Bandaraya LRT, with the city's tech ecosystem on your doorstep.",
  },
  {
    title: "Built for builders",
    description:
      "Fast internet, meeting rooms, and a community of people shipping AI products alongside you every day.",
  },
];

const Venue = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      <main>
        {/* Hero */}
        <div className="px-3 md:px-4 lg:px-6 pt-16">
          <section className="relative h-[60vh] min-h-[420px] flex flex-col overflow-hidden rounded-2xl border border-border text-white">
            <div className="absolute inset-0 z-0">
              <img
                src="/batik_kl_city_sunset.png"
                alt="KL city at sunset"
                className="w-full h-full object-cover saturate-[1.8] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
            </div>
            <div className="relative z-10 flex-1 flex flex-col justify-end px-8 md:px-14 pb-12">
              <p className="label-default text-white/70 mb-3">Host</p>
              <h1 className="hero-title text-white">500 Global KL</h1>
              <p className="body-large text-white/85 mt-3 max-w-xl">
                The permanent home of the Malaysian AI Residency — where builders work, ship,
                and grow together in Kuala Lumpur.
              </p>
            </div>
          </section>
        </div>

        {/* About the space */}
        <section className="py-20 md:py-28 bg-background">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16 gap-10">
              <div>
                <p className="label-default text-foreground/60 mb-3">The Space</p>
                <h2 className="section-title text-foreground">
                  Where the work actually happens
                </h2>
                <p className="body-default text-foreground/70 mt-4">
                  500 Global hosts the Malaysian AI Residency at their permanent space in KL —
                  a place residents can show up to every day. Come in, build alongside a
                  tight-knit community of people shipping serious AI products, and keep coming
                  back.
                </p>
                <p className="body-default text-foreground/70 mt-3">
                  The space has fast internet, private meeting areas, and open working space
                  that encourages the kind of spontaneous conversations that move things forward.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <CTAButton href="/residency" variant="outline" size="sm" showArrow isExternal={false}>
                    Apply to the residency
                  </CTAButton>
                  <CTAButton href="/contact" variant="outline" size="sm" showArrow={false} isExternal={false}>
                    Get in touch
                  </CTAButton>
                </div>
              </div>
              <div className="space-y-3">
                <img
                  src="https://apicms.thestar.com.my/uploads/images/2023/09/25/2301890.jpg"
                  alt="500 Global KL workspace interior"
                  loading="lazy"
                  className="w-full h-64 md:h-72 object-cover rounded-2xl"
                />
                <p className="text-[10px] uppercase tracking-widest text-foreground/50">
                  Source: The Star
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-20 md:py-28 bg-muted">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((h) => (
                <div key={h.title} className="rounded-2xl border border-border/60 bg-background p-7">
                  <h3 className="subsection-title text-foreground">{h.title}</h3>
                  <p className="body-default text-foreground/70 mt-3">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20 md:py-28 bg-background">
          <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
            <div className="flex flex-col md:grid md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:items-start md:gap-16 gap-8">
              <div>
                <p className="label-default text-foreground/60 mb-3">Location</p>
                <h2 className="section-title text-foreground">Find us in the heart of KL</h2>
                <p className="body-default text-foreground/70 mt-4">
                  500 Global<br />
                  Bangunan AICB<br />
                  10 Jalan Dato&apos; Onn<br />
                  50480 Kuala Lumpur, Malaysia
                </p>
                <p className="body-default text-foreground/70 mt-3">
                  Accessible by car and LRT — Bandaraya station is a short walk away.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="https://waze.com/ul?q=Bangunan%20AICB%2C%2010%20Jalan%20Dato%27%20Onn%2C%2050480%20Kuala%20Lumpur&navigate=yes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-transparent px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:border-foreground/40 hover:text-foreground hover:bg-foreground/5"
                  >
                    Open in Waze
                  </a>
                  <a
                    href="https://maps.app.goo.gl/PpAWmkBK5RnFCquq7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-foreground/20 bg-transparent px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:border-foreground/40 hover:text-foreground hover:bg-foreground/5"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
              <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-border">
                <iframe
                  title="500 Global KL location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7717!2d101.6929!3d3.1487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49c701efeae7%3A0x504f0b535c0728c1!2sBangunan%20AICB!5e0!3m2!1sen!2smy!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Venue;
