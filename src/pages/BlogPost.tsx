import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CTAButton } from "@/components/CTAButton";
import NotFound from "@/pages/NotFound";
import { categoryMetadata, getBlogPost } from "@/lib/blog-data";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
    .format(new Date(date))
    .toUpperCase();
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug);

  if (!post) {
    return <NotFound />;
  }

  const category = post.category ? categoryMetadata[post.category] : null;

  return (
    <div className="min-h-screen text-foreground relative bg-background">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-muted/60 to-transparent" />
      </div>

      <Navbar />

      <main className="relative min-h-screen">
        <article className="py-12 md:py-16 lg:py-20 pt-36">
          <div className="mx-auto w-full max-w-[720px] px-6 sm:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center justify-center w-9 h-9 text-foreground/70 hover:text-foreground transition-colors group mb-6 rounded-full border border-border hover:border-foreground/30 bg-background"
              aria-label="Back to Blog"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>

            <header className="mb-10">
              {post.category ? (
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60 mb-4">
                  <span
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${category?.accent ?? "from-muted to-background"}`}
                  />
                  {post.category.replace(/-/g, " ")}
                </span>
              ) : null}

              {post.date ? (
                <time dateTime={post.date} className="block text-xs font-semibold text-foreground/60 mb-4">
                  {formatDate(post.date)}
                </time>
              ) : null}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] mb-5 text-foreground">
                {post.title}
              </h1>
              {post.summary ? <p className="text-base md:text-lg text-foreground/70">{post.summary}</p> : null}

              <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted border border-border" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{post.author ?? "Author"}</span>
                    <span className="text-xs text-foreground/60">Residency Team</span>
                  </div>
                </div>

                {post.readingTime ? (
                  <span className="text-xs text-foreground/60">{post.readingTime}</span>
                ) : null}
              </div>
            </header>

            {post.cover ? (
              <div className="mb-10 -mx-6 sm:-mx-8 md:mx-0">
                <div className="relative aspect-[16/9] w-full md:rounded-2xl overflow-hidden border border-border bg-card" />
              </div>
            ) : null}

            <div className="space-y-10 text-foreground/80 text-base leading-7">
              {post.content.map((block, index) => (
                <section key={`${post.slug}-block-${index}`} className="space-y-4">
                  {block.heading ? (
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                      {block.heading}
                    </h2>
                  ) : null}
                  {block.paragraphs?.map((paragraph, paragraphIndex) => (
                    <p key={`${post.slug}-paragraph-${index}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                  {block.bullets ? (
                    <ul className="space-y-2 list-disc list-inside text-foreground/70">
                      {block.bullets.map((item, bulletIndex) => (
                        <li key={`${post.slug}-bullet-${index}-${bulletIndex}`}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {block.quote ? (
                    <blockquote className="border-l-2 border-border pl-4 text-foreground/70 italic">
                      {block.quote}
                    </blockquote>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Apply for the next cohort</h3>
                  <p className="text-sm text-foreground/70">
                    Join the Malaysian AI Residency and build alongside mentors and partners.
                  </p>
                </div>
                <CTAButton href="/book-demo" variant="primary" size="md" isExternal={false}>
                  Apply now
                </CTAButton>
              </div>
            </div>

            <footer className="mt-16 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <p className="text-sm text-foreground/60">Explore more updates from the residency.</p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors"
                >
                  Read More Posts
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </footer>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
