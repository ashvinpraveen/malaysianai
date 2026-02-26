import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/views/BlogPost";
import { blogPosts, getBlogPost } from "@/lib/blog-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.summary ?? "Residency updates from Malaysian AI.",
    openGraph: {
      title: post.title,
      description: post.summary ?? "Residency updates from Malaysian AI.",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary ?? "Residency updates from Malaysian AI.",
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary ?? "Residency updates from Malaysian AI.",
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author ?? "Malaysian AI",
    },
    publisher: {
      "@type": "Organization",
      name: "Malaysian AI",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.svg`,
      },
    },
    url: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPost post={post} />
    </>
  );
}
