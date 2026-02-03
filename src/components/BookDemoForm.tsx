const BookDemoForm = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-card rounded-[2.5rem] p-6 md:p-10 shadow-[0_2px_40px_-12px_rgba(11,31,35,0.12)] border border-border space-y-6">
      <iframe
        title="Malaysian AI Residency Application"
        src="https://airtable.com/embed/appBgmnpu1bJljnxX/pagEZn6n60tDty3lP/form"
        className="w-full h-[1300px] md:h-[1500px] rounded-2xl border border-border bg-background"
        loading="lazy"
      />
      <p className="text-center text-sm text-foreground/60">
        If the form doesn’t load, you can{" "}
        <a
          href="https://airtable.com/appBgmnpu1bJljnxX/pagEZn6n60tDty3lP/form"
          className="underline underline-offset-4 hover:text-foreground"
          target="_blank"
          rel="noreferrer"
        >
          open it in a new tab
        </a>
        .
      </p>
    </div>
  );
};

export default BookDemoForm;
