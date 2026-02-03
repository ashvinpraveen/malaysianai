import { Link, useSearchParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { blogPosts, categories, categoryMetadata, type BlogCategory, type BlogPost } from "@/lib/blog-data";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
    .format(new Date(date))
    .toUpperCase();
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BlogNavigation({ mobile = false }: { mobile?: boolean }) {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const isActive = (value: BlogCategory | null) =>
    value === null ? !categoryFilter : categoryFilter === value;

  if (mobile) {
    return (
      <nav className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Link
            key={category.label}
            to={category.href}
            className={`py-2 px-4 label-default uppercase tracking-wide rounded-full transition-all duration-300 whitespace-nowrap ${
              isActive(category.value)
                ? "text-cream bg-dark-teal"
                : "text-foreground/60 bg-cream border border-dark-teal/15 hover:border-dark-teal/30 hover:text-foreground"
            }`}
          >
            {category.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="space-y-1">
      {categories.map((category) => (
        <Link
          key={category.label}
          to={category.href}
          className={`block py-2 label-default uppercase tracking-wide transition-colors duration-300 ${
            isActive(category.value) ? "text-foreground" : "text-muted-foreground/70 hover:text-foreground"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  );
}

function CategoryHeader() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") as BlogCategory | null;

  if (!categoryFilter || !(categoryFilter in categoryMetadata)) {
    return null;
  }

  const metadata = categoryMetadata[categoryFilter];

  return (
    <div className="mb-12 pb-12 border-b border-border flex flex-col items-center text-center max-w-2xl mx-auto">
      <div
        className={`mb-6 h-20 w-20 rounded-full bg-gradient-to-br ${metadata.accent} ring-1 ring-dark-teal/15 flex items-center justify-center bg-cream`}
      >
        <span className="label-default font-normal text-foreground/80 tracking-[0.2em]">{metadata.badge}</span>
      </div>
      <h2 className="subsection-title text-foreground mb-4">{metadata.title}</h2>
      <p className="body-default text-muted-foreground/80">{metadata.description}</p>
    </div>
  );
}

function BlogPostsGrid({ posts }: { posts: BlogPost[] }) {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") as BlogCategory | null;

  const filteredPosts =
    categoryFilter && categoryFilter in categoryMetadata
      ? posts.filter((post) => post.category === categoryFilter)
      : posts;

  if (!filteredPosts.length) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-dashed border-border text-muted-foreground/70 body-default">
          <BookOpen className="w-4 h-4" />
          No updates yet
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
      {filteredPosts.map((post) => (
        <Link
          key={post.slug}
          to={`/blog/${post.slug}`}
          className="block h-full group w-full"
          aria-label={`Read: ${post.title}`}
        >
          <Card className="elevated-card relative h-full w-full p-0 gap-0 overflow-hidden rounded-3xl">
            {post.cover ? (
              <div className="overflow-hidden">
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : null}
            <CardHeader className="pb-4 pt-7 px-6 sm:px-7 space-y-3.5">
              {post.category ? (
                <span className="label-default uppercase tracking-wide text-foreground/70">
                  {post.category.replace(/-/g, " ")}
                </span>
              ) : null}
              <CardTitle className="card-title text-foreground">
                {post.title}
              </CardTitle>
              {post.summary ? <p className="body-small text-muted-foreground/80">{post.summary}</p> : null}
            </CardHeader>
            <CardContent className="pt-4 pb-7 px-6 sm:px-7">
              <div className="flex items-center gap-3 label-default text-muted-foreground/70 uppercase tracking-wide">
                {post.author ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-foreground/5 text-[10px] text-foreground/70 font-normal">
                        {getInitials(post.author)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{post.author}</span>
                  </div>
                ) : null}
                {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : null}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

const Blog = () => {
  return (
    <div className="min-h-screen text-foreground relative bg-cream">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-cream via-cream/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-cream-dark/60 to-transparent" />
      </div>

      <Navbar />

      <main className="relative min-h-screen">
        <section className="pb-24 pt-40 md:pt-48">
          <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
              <aside className="hidden lg:block w-52 flex-shrink-0">
                <div className="sticky top-32">
                  <h1 className="section-title text-foreground mb-3">Updates</h1>
                  <p className="body-default text-muted-foreground/80 mb-8">
                    Residency updates, cohort stories, and program announcements.
                  </p>
                  <BlogNavigation />
                </div>
              </aside>

              <div className="flex-1">
                <div className="lg:hidden mb-12">
                  <h1 className="section-title text-foreground mb-3">Updates</h1>
                  <p className="body-default text-muted-foreground/80 mb-8">
                    Residency updates, cohort stories, and program announcements.
                  </p>
                  <BlogNavigation mobile />
                </div>

                <CategoryHeader />
                <BlogPostsGrid posts={blogPosts} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
