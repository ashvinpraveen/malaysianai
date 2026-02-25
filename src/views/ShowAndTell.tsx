"use client";

import type { FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";

const ShowAndTell = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const referral = String(formData.get("referral") ?? "").trim();
    const social = String(formData.get("social") ?? "").trim();
    const project = String(formData.get("project") ?? "").trim();
    const learn = String(formData.get("learn") ?? "").trim();

    const messageLines = [
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      social ? `Social: ${social}` : null,
      referral ? `Referral: ${referral}` : null,
      "",
      project ? `What I am working on: ${project}` : null,
      learn ? `What's something I learned this week: ${learn}` : null,
    ].filter((line): line is string => line !== null);

    const whatsappLink = `https://wa.me/60109847954?text=${encodeURIComponent(
      messageLines.join("\n")
    )}`;

    window.location.href = whatsappLink;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow w-full flex flex-col items-center justify-start px-4 pt-32 pb-20 relative z-10 selection:bg-muted">
        <div className="w-full max-w-4xl mx-auto mb-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-foreground/70 text-xs font-semibold uppercase tracking-wider">
            Show and Tell Thursdays
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-medium text-foreground tracking-[-0.02em]">
            Join a Show and Tell Thursday
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Every Thursday we have an open day where builders can share what
            they&#39;re tinkering with, what they&#39;re learning, and learn from other
            builders. The show and tell session happens at 4pm, though you&#39;re
            invited to cowork with us from 11am till then too.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-4xl mx-auto bg-card rounded-[2.5rem] p-6 md:p-10 shadow-[0_2px_40px_-12px_rgba(11,31,35,0.12)] border border-border space-y-5 text-left"
        >
          <div className="space-y-2">
            <label htmlFor="show-name" className="text-sm font-medium text-foreground/70">
              Name
            </label>
            <input
              id="show-name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="show-email" className="text-sm font-medium text-foreground/70">
              Email
            </label>
            <input
              id="show-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="show-project" className="text-sm font-medium text-foreground/70">
              What are you tinkering with?
            </label>
            <textarea
              id="show-project"
              name="project"
              rows={4}
              required
              placeholder="Share your project or current focus."
              className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="show-social" className="text-sm font-medium text-foreground/70">
              Share your LinkedIn link (or other social media links)
            </label>
            <input
              id="show-social"
              name="social"
              type="text"
              required
              placeholder="linkedin.com/in/yourname"
              className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="show-referral" className="text-sm font-medium text-foreground/70">
              Did anyone refer you?
            </label>
            <input
              id="show-referral"
              name="referral"
              type="text"
              placeholder="Full name of the person who referred you"
              className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="show-learn" className="text-sm font-medium text-foreground/70">
              What&apos;s something you learned this week?
            </label>
            <textarea
              id="show-learn"
              name="learn"
              rows={3}
              required
              placeholder="Share anything that you learned recently. It could be related to GTM, technology, tools."
              className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-background px-4 py-3">
            <input
              id="show-understanding"
              name="understanding"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-foreground/20 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            />
            <label htmlFor="show-understanding" className="text-sm leading-relaxed text-foreground/80">
              I understand this is not a pitch. This is a builder sharing session
              where I share what I&apos;m tinkering with, learn from other builders,
              and contribute to the community. I also consent to my pictures /
              videos being taken during the session for media purposes.
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <CTAButton type="submit" variant="primary" size="lg">
              Apply to join a show and tell session
            </CTAButton>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ShowAndTell;
