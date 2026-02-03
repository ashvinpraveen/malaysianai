const Location = () => {
  return (
    <section id="location" className="py-20 md:py-28 bg-background">
      <div className="mx-auto px-6 md:px-10 lg:px-16 max-w-[1440px]">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
          <div className="w-full md:w-[55%]">
            <img
              src="https://apicms.thestar.com.my/uploads/images/2023/09/25/2301890.jpg"
              alt="AICB workspace interior"
              loading="lazy"
              className="w-full h-64 md:h-72 lg:h-80 object-cover rounded-2xl"
            />
            <p className="mt-2 text-[10px] uppercase tracking-widest text-foreground/50">Source: The Star</p>
          </div>
          <div className="w-full md:w-[45%]">
            <p className="label-default text-foreground/60 mb-3">Location</p>
            <h2 className="section-title text-foreground">Based in the heart of KL</h2>
            <p className="body-default text-foreground/70 mt-3">
              500 Global, Bangunan AICB, 10 Jalan Dato&#39; Onn, 50480 Kuala Lumpur, Malaysia
            </p>
            <p className="body-default text-foreground/70 mt-2">
              Accessible by car &amp; LRT (Bandaraya)
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
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
        </div>
      </div>
    </section>
  );
};

export default Location;
