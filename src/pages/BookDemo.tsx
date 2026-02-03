import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookDemoForm from "@/components/BookDemoForm";

const BookDemo = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow w-full flex flex-col items-center justify-start px-4 pt-32 pb-20 relative z-10 selection:bg-muted">
        <div className="w-full max-w-4xl mx-auto mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-foreground/70 text-xs font-semibold uppercase tracking-wider">
            Residency application
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] font-medium text-foreground tracking-[-0.02em]">
            Apply to the Malaysian AI Residency
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Tell us about your background, your project idea, and how you want
            to build during the cohort.
          </p>
        </div>

        <div className="w-full">
          <BookDemoForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookDemo;
