"use client";

import type { FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const messageLines = [
      name ? `Name: ${name}` : null,
      email ? `Email: ${email}` : null,
      subject ? `Subject: ${subject}` : null,
      "",
      message,
    ].filter((line): line is string => line !== null);

    const whatsappLink = `https://wa.me/60109847954?text=${encodeURIComponent(
      messageLines.join("\n")
    )}`;

    window.location.href = whatsappLink;
  };

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <Navbar />

      <main className="pt-32 pb-24">
        <section className="px-6 md:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <p className="text-sm font-medium text-foreground/60">Contact</p>
            <h1 className="section-title text-foreground">Get in touch</h1>
            <p className="body-default text-foreground/70">
              Send a message about partnerships, residency questions, or community collaborations.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 lg:px-16 mt-12">
          <div className="mx-auto max-w-5xl grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] items-start">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-background p-6 md:p-8 space-y-5"
            >
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-foreground/70"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-foreground/70"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium text-foreground/70"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-foreground/70"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us a bit about your request."
                  className="w-full rounded-xl border border-foreground/10 bg-background px-4 py-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <CTAButton type="submit" variant="primary" size="lg">
                  Send message
                </CTAButton>
              </div>
            </form>

            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="text-sm font-medium text-foreground/60 mb-2">Response time</p>
                <p className="body-small text-foreground/70">We reply within two business days.</p>
                <p className="body-small text-foreground/70 mt-2">
                  For residency applications, use the apply page.
                </p>
                <div className="mt-4">
                  <CTAButton href="/residency/apply" variant="secondary" size="sm" showArrow isExternal={false}>
                    Apply for residency
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
